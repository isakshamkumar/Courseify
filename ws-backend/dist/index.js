"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const ioredis_1 = require("ioredis");
const close_with_grace_1 = __importDefault(require("close-with-grace"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
const ExpressServer = (0, http_1.createServer)(app);
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || "redis://default:a44626e60808406ca07e7de73bfbb211@outgoing-octopus-36444.upstash.io:36444";
const CONNECTION_COUNT_KEY = "user:connection-count";
const CONNECTION_COUNT_UPDATED_CHANNEL = "user:connection-count-updated";
const NEW_MESSAGE_CHANNEL = "chat:new-message";
if (!UPSTASH_REDIS_REST_URL) {
    console.error("Missing Upstash Redis Url");
    process.exit(1);
}
const publisher = new ioredis_1.Redis(UPSTASH_REDIS_REST_URL);
const subscriber = new ioredis_1.Redis(UPSTASH_REDIS_REST_URL);
const io = new socket_io_1.Server(ExpressServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
const getUsersCount = () => __awaiter(void 0, void 0, void 0, function* () {
    const usersCurrentCount = yield publisher.get(CONNECTION_COUNT_KEY);
    if (!usersCurrentCount) {
        yield publisher.set(CONNECTION_COUNT_KEY, 0);
    }
    return usersCurrentCount;
});
getUsersCount();
subscriber.subscribe(CONNECTION_COUNT_UPDATED_CHANNEL, (err, count) => {
    //this count refers to the number of subscribers of this channel
    //in out case the server itself is a subscriber
    //Each time a new client connects or disconnects, the server publishes a message to this channel with the updated count of connected users. The server, being a subscriber to this channel, receives these messages and logs them.
    if (err) {
        console.error(`Error Subscribing to ${CONNECTION_COUNT_UPDATED_CHANNEL}`, err);
        return;
    }
    else {
        console.log(`${count} clients/Servers connected to ${CONNECTION_COUNT_UPDATED_CHANNEL} channel`);
    }
});
subscriber.subscribe(NEW_MESSAGE_CHANNEL, (err, count) => {
    //this count refers to the number of subscribers of this channel
    //in out case the server itself is a subscriber
    //Each time a new client connects or disconnects, the server publishes a message to this channel with the updated count of connected users. The server, being a subscriber to this channel, receives these messages and logs them.
    if (err) {
        console.error(`Error Subscribing to ${NEW_MESSAGE_CHANNEL}`, err);
        return;
    }
    else {
        console.log(`${count} clients/Servers connected to ${NEW_MESSAGE_CHANNEL} channel`);
    }
});
subscriber.on("message", (channel, text) => {
    if (channel === CONNECTION_COUNT_UPDATED_CHANNEL) {
        console.log('msg from CONNECTION_COUNT_UPDATED_CHANNEL');
        console.log(typeof text);
        io.emit(CONNECTION_COUNT_UPDATED_CHANNEL, { count: text });
    }
    if (channel == NEW_MESSAGE_CHANNEL) {
        console.log('msg fromNEW_MESSAGE_CHANNEL');
        console.log(text, 'from backend msg');
        console.log(typeof text, 'type');
        console.log(JSON.parse(text), 'json ');
        // console.log(JSON.stringify(text),'json');
        io.emit(NEW_MESSAGE_CHANNEL, { msg: JSON.parse(text) });
    }
});
let userCount = 0;
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    userCount++;
    //   io.emit("connectionCount", userCount);
    const newUserCount = yield publisher.incr(CONNECTION_COUNT_KEY);
    yield publisher.publish(CONNECTION_COUNT_UPDATED_CHANNEL, newUserCount.toString());
    console.log(newUserCount, "newUserCount");
    console.log("New User Connected");
    socket.on("disconnect", (reason) => __awaiter(void 0, void 0, void 0, function* () {
        const newUserCount = yield publisher.decr(CONNECTION_COUNT_KEY);
        yield publisher.publish(CONNECTION_COUNT_UPDATED_CHANNEL, newUserCount.toString());
        userCount--;
        console.log(reason);
        console.log("User Disconnected");
    }));
    socket.on("msg", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(msg);
        // console.log(typeof msg.toString(),'type of mssg');
        yield publisher.publish(NEW_MESSAGE_CHANNEL, msg.toString());
        // io.emit("message", msg);
    }));
}));
const PORT = 3001;
app.get("/", (req, res) => {
    // throw new Error("Not implemented!")
    res.json({ msg: "hello" });
});
ExpressServer.listen(PORT, () => {
    try {
        (0, close_with_grace_1.default)({ delay: 2500 }, ({ signal, err }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(userCount, 'usercount');
            console.log("shutting down the server, GoodBye");
            console.log({ err, signal }, 'error signal');
            // Custom logic for cleanup, in your case, updating user count in Redis
            if (userCount > 0) {
                console.log(`Removing ${userCount} from the Connected Users Count`);
                try {
                    const currenUsers = parseInt((yield publisher.get(CONNECTION_COUNT_KEY)) || "0");
                    const newUserCount = Math.max(currenUsers - userCount, 0);
                    yield publisher.set(CONNECTION_COUNT_KEY, newUserCount.toString());
                }
                catch (error) {
                    console.error("Error updating connected users count:", error);
                }
            }
        }));
    }
    catch (error) {
        console.log('error');
    }
    console.log(`Server is listening on Port ${PORT}`);
});
