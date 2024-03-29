import express, { Request, Response, json } from "express";
import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "../../prisma/client";
import cron from "node-cron";
import { createServer } from "http";
import { Server } from "socket.io";
import { Redis } from "ioredis";
import closeWithGrace from "close-with-grace";
import cors from "cors";
import multer from "multer";
import { Readable } from "stream";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs"
const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3001;
const ExpressServer = createServer(app);
const UPSTASH_REDIS_REST_URL =
  process.env.UPSTASH_REDIS_REST_URL ||
  "redis://default:a44626e60808406ca07e7de73bfbb211@outgoing-octopus-36444.upstash.io:36444";
const CONNECTION_COUNT_KEY = "user:connection-count:";
const CONNECTION_COUNT_UPDATED_CHANNEL = "user:connection-count-updated:";
const NEW_MESSAGE_CHANNEL = "chat:new-message:";
const NEW_MESSAGE_LIST = "chat:new-message-list";

if (!UPSTASH_REDIS_REST_URL) {
  console.error("Missing Upstash Redis Url");
  process.exit(1);
}
const publisher = new Redis(UPSTASH_REDIS_REST_URL);
const subscriber = new Redis(UPSTASH_REDIS_REST_URL);
const io = new Server(ExpressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAYU6NUHDAU3RROFGT",
    secretAccessKey: "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",
  },
});
const upload = multer({ dest: 'uploads/' }); // Set the destination directory for uploaded files

app.post("/upload", upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read the file contents
    const fileContent = fs.readFileSync(file.path);

    // Specify S3 bucket name and key (filename)
    const bucketName = "courseifyprivatebucket";
    const key = file.originalname; // You can adjust the S3 key as needed

    // Upload file to S3
    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: fileContent,
    };
    const command = new PutObjectCommand(uploadParams);
    const result = await s3Client.send(command);

    // Return success response
    res.status(200).json({ message: "File uploaded successfully", data: result });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    // Return error response
    //@ts-ignore
    res.status(500).json({ error: "Failed to upload file to S3", message: error.message })
  }
});


const getUsersCount = async (room: string) => {
  const usersCurrentCount = await publisher.get(
    `${CONNECTION_COUNT_KEY}` + room
  );

  if (!usersCurrentCount) {
 const aisehi=   await publisher.set(`${CONNECTION_COUNT_KEY}` + room, 0);
 console.log(aisehi,'aesi hi--> it returns OK');
 
  }
  return usersCurrentCount;
};
// getUsersCount();
// subscriber.subscribe(CONNECTION_COUNT_UPDATED_CHANNEL, (err, count) => {
//   //this count refers to the number of subscribers of this channel
//   //in out case the server itself is a subscriber
//   //Each time a new client connects or disconnects, the server publishes a message to this channel with the updated count of connected users. The server, being a subscriber to this channel, receives these messages and logs them.
//   if (err) {
//     console.error(
//       `Error Subscribing to ${CONNECTION_COUNT_UPDATED_CHANNEL}`,
//       err
//     );
//     return;
//   } else {
//     console.log(
//       `${count} clients/Servers connected to ${CONNECTION_COUNT_UPDATED_CHANNEL} channel`
//     );
//   }
// });
// subscriber.subscribe(NEW_MESSAGE_CHANNEL, (err, count) => {
//   //this count refers to the number of subscribers of this channel
//   //in out case the server itself is a subscriber
//   //Each time a new client connects or disconnects, the server publishes a message to this channel with the updated count of connected users. The server, being a subscriber to this channel, receives these messages and logs them.
//   if (err) {
//     console.error(`Error Subscribing to ${NEW_MESSAGE_CHANNEL}`, err);
//     return;
//   } else {
//     console.log(
//       `${count} clients/Servers connected to ${NEW_MESSAGE_CHANNEL} channel`
//     );
//   }
// });
const socketRoomMap = new Map<string, string>();
subscriber.on("message", async (channel, text) => {
  console.log(channel, "chaneeeeeeelllllllllllll");

  if (channel.startsWith(CONNECTION_COUNT_UPDATED_CHANNEL)) {
    console.log("msg from CONNECTION_COUNT_UPDATED_CHANNEL");
    console.log(typeof text);
    console.log(text,'user count ig');
    
    const room = channel.replace(CONNECTION_COUNT_UPDATED_CHANNEL, "");
    io.to(`${room}`).emit(CONNECTION_COUNT_UPDATED_CHANNEL, { count: text });
  }
  if (channel.startsWith(NEW_MESSAGE_CHANNEL)) {
    console.log("starts withhhhh");
    const room = channel.replace(NEW_MESSAGE_CHANNEL, "");
    // console.log("msg fromNEW_MESSAGE_CHANNEL");
    // console.log(text, "from backend msg");
    // console.log(typeof text, "type");
    // console.log(JSON.parse(text), "json ");
    // // console.log(JSON.stringify(text),'json');
    // //multiple servers par duplicate messages copy ho jayenge??
    console.log(room, "roooooom from sub");

    io.to(`${room}`).emit("chat:new-message", JSON.parse(text));
    // io.emit(NEW_MESSAGE_CHANNEL, { msg: JSON.parse(text) });
  }
});
let userCount = 0;
io.on("connection", async (socket) => {

  //   io.emit("connectionCount", userCount);
  // const newUserCount = await publisher.incr(CONNECTION_COUNT_KEY);
  // await publisher.publish(
  //   CONNECTION_COUNT_UPDATED_CHANNEL,
  //   newUserCount.toString()
  // );
  // console.log(newUserCount, "newUserCount");
  console.log("New User Connected");

  socket.on("disconnect", async (reason) => {
    //@ts-ignore
    console.log(socket.room,'room after disconnect');
    const roomId = socketRoomMap.get(socket.id); 
    if(roomId){
      
      const newUserCount = await publisher.decr(`${CONNECTION_COUNT_KEY}`+ roomId);
      await publisher.publish(
        `${CONNECTION_COUNT_UPDATED_CHANNEL}` + roomId,
        newUserCount.toString()
      );
      userCount--;
    }
   
    console.log(reason);

    console.log("User Disconnected");
  });
  socket.on("joinRoom", async (msg) => {
   
    socketRoomMap.set(socket.id, msg.room);
    console.log(socket.rooms,'rooms');
    
    console.log(msg.room,'msg room from joinRooom');
    
    userCount++;
   await getUsersCount(msg.room);
  //  console.log(returnedCount,'returned Count from join');
   
    const newUserCount = await publisher.incr(
      `${CONNECTION_COUNT_KEY}` + msg.room
    );
    console.log(newUserCount,'user count after publisher incremetn');
    
    subscriber.subscribe(
      CONNECTION_COUNT_UPDATED_CHANNEL + msg.room,
      (err, count) => {
        //this count refers to the number of subscribers of this channel
        //in out case the server itself is a subscriber
        //Each time a new client connects or disconnects, the server publishes a message to this channel with the updated count of connected users. The server, being a subscriber to this channel, receives these messages and logs them.
        if (err) {
          console.error(`Error Subscribing to ${CONNECTION_COUNT_UPDATED_CHANNEL}`, err);
          return;
        } else {
          console.log(
            `${count} clients/Servers connected to ${
              CONNECTION_COUNT_UPDATED_CHANNEL + msg.room
            } channel`
          );
        }
      }
    );
    subscriber.subscribe(NEW_MESSAGE_CHANNEL + msg.room, (err, count) => {
      //this count refers to the number of subscribers of this channel
      //in out case the server itself is a subscriber
      //Each time a new client connects or disconnects, the server publishes a message to this channel with the updated count of connected users. The server, being a subscriber to this channel, receives these messages and logs them.
      if (err) {
        console.error(`Error Subscribing to ${NEW_MESSAGE_CHANNEL}`, err);
        return;
      } else {
        console.log(
          `${count} clients/Servers connected to ${
            NEW_MESSAGE_CHANNEL + msg.room
          } channel`
        );
      }
    });
    console.log(newUserCount, "newUserCount");
    console.log("New User Connected");
    socket.join(`${msg.room}`);
    console.log(`Socket ${socket.id} Joined Room ${msg.room}`);
    await publisher.publish(
      `${CONNECTION_COUNT_UPDATED_CHANNEL}` + msg.room,
      newUserCount.toString()
    );
   

 

    // await publisher.publish(CONNECTION_COUNT_UPDATED_CHANNEL + msg.room, "Hello");
  });
  socket.on("msg", async (msg) => {
    console.log(msg);
    const { room } = msg;
    msg= JSON.stringify(msg)
    // console.log(msg, "msg");
    
    // console.log(JSON.parse(msg), "json mssg");

    // socket.join(msg.room)
    // console.log(typeof msg, "type of mssg");
    console.log(room, "rrrrrrrrrrrrrrrrrrooooooooooooooooooommmmmmmmmmmm");

    // console.log(JSON.parse(msg),'json msgggggg jaldiiiiiiiiiiiiiii');

    console.log(typeof msg.toString(), "type of mssg");

    await publisher.publish(NEW_MESSAGE_CHANNEL + room, msg.toString());
    publisher.lpush(NEW_MESSAGE_LIST, msg, (err, result) => {
      if (err) {
        console.error("Error pushing message to Redis list:", err);
      } else {
        console.log("Message pushed to the Redis list successfully.");
        console.log(result, "items in list");
      }
    });
    //lpush item to the redis list
    /**  client.lpush(userId, JSON.stringify(message), (error, result) => {
    if (error) {
      console.error('Error pushing message to Redis list:', error);
      callback(error);
    } else {
      console.log('Message pushed to the Redis list successfully.');
      callback(null, result);
    }
  });
 */

    // io.emit("message", msg);
  });
});

app.get("/healthcheck", (req, res) => {
  res.json({ msg: "ok" });
});
app.get("/", (req: Request, res: Response) => {
  // throw new Error("Not implemented!")
  res.json({ msg: "hello" });
});

ExpressServer.listen(PORT, () => {
  try {
    cron.schedule("0 */2 * * *", async () => {
      console.log("running cron job");

      // try {
      //   const messages = await publisher.lrange(NEW_MESSAGE_LIST, 0, -1);
      //   console.log(messages,'messages');

      //   const parsedMessages = messages.map((message) => JSON.parse(message));
      //   console.log(parsedMessages,'parsed messages');

      //   // Use Promise.all to wait for all create operations to complete
      //   await Promise.all(parsedMessages.map(async (message) => {
      //     await prisma?.message.create({
      //       data: {
      //         userId: message.userId,
      //         message:message.msg

      //       },
      //     });
      //   }));
      //   await publisher.ltrim(NEW_MESSAGE_LIST, 1, 0);
      //   console.log( await publisher.lrange(NEW_MESSAGE_LIST, 0, -1) )

      // } catch (error) {
      //   console.error('Error creating messages:', error);
      // }
    });
    closeWithGrace({ delay: 2500 }, async ({ signal, err }) => {
      console.log(userCount, "usercount");
      console.log("shutting down the server, GoodBye");
      console.log({ err, signal }, "error signal");

      // Custom logic for cleanup, in your case, updating user count in Redis
      if (userCount > 0) {
        console.log(`Removing ${userCount} from the Connected Users Count`);

        try {
          const currenUsers = parseInt(
            (await publisher.get(CONNECTION_COUNT_KEY)) || "0"
          );
          const newUserCount = Math.max(currenUsers - userCount, 0);
          await publisher.set(CONNECTION_COUNT_KEY, newUserCount.toString());
        } catch (error) {
          console.error("Error updating connected users count:", error);
        }
      }
    });
  } catch (error) {
    console.log("error");
  }

  console.log(`Server is listening on Port ${PORT}`);
});
