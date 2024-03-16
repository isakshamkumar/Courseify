  "use client";
  import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
  } from "react";
  import ModalImage from "react-modal-image";
  import { io } from "socket.io-client";
  import { MdOutlineZoomOutMap } from "react-icons/md";

  import { CiUser } from "react-icons/ci";
  import Button from "../Button";
  import { IoFolderOpenOutline } from "react-icons/io5";
  import { useSelector } from "react-redux";
  import { useSearchParams } from "next/navigation";
  import Spinner from "../Spinner";
  import SocketContext from "@/app/packages/context/SocketContext";
  import { Toaster, toast } from "react-hot-toast";
  import { handleUpload } from "@/app/packages/lib/uploadFile";

  // const img =
  //   "https://images.pexels.com/photos/5273062/pexels-photo-5273062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  type Props = {};

  const ChatPage = ({ selectedRoom }) => {
    const inputMsg = useRef(null);
    const [connectedUsers, setConnectedUsers] = useState(0);
    const handleFileChange = (e) => {
      // console.log("called");
      let file = e.target.files[0];
      // console.log(e.target.files, "target files");

      setSelectedFile(e.target.files[0]);
      // handleUpload(e.target.files[0])
      const { time, date } = getFormattedDate();
      const reader = new FileReader();
      reader.onload = (event) => {
        const msg = {
          holder: userName,
          holderImgSrc: img,
          time,
          userId,
          date,
          msg: inputMsg.current.value, // Set to empty since this is a file message
          file: event.target.result,
          room: roomId,
        };

        if (socket) {
          socket.emit("msg", msg);
          inputMsg.current.value = "";
        }
      };
      reader.readAsDataURL(file);
    };
    const [selectedFilePreview, setSelectedFilePreview] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);
    // const [chatSocket, setchatSocket] = useState(null);
    //@ts-ignore
    const userName = useSelector((state) => state.user.user.name);
    const roomId = useSearchParams().get("id");
    // console.log(roomId, "roooooooooom");

    //@ts-ignore
    const userId = useSelector((state) => state.user.user.id);
    // console.log(
    //   //@ts-ignore
    //   useSelector((state) => state.user),
    //   "userrrrrrrr"
    // );

    //@ts-ignore
    let img = useSelector((state) => state.user.user.image);
    // console.log(img, "img from user.image");

    if (!img) {
      img =
        "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=900&t=st=1710411817~exp=1710412417~hmac=d584b8e8042241ce72ae392dd2cf2c031f8a25626e101f9d94dda0a4bb5b3a13";
    }

    const { socket } = useContext(SocketContext);
    // console.log('chat page');
    // console.log(socket, "from chat pageeeeeeeeeeeeeeeeeeeeeeeeeeeee agaiiiiiiin");

    useEffect(() => {
      // console.log("use effecr called");
  const connectedUser= localStorage.getItem("connectedUserCount")
  setConnectedUsers(+connectedUser);
      // console.log(socket, "from chatttttttttttt");
      if (socket?.connected) {
        toast.success("Connected to socket server in ChatPage");
        socket.on("chat:new-message", (msg) => {
          // msg.holderImgSrc=img;
          // alert("new")
          // alert("new message");
          // console.log(msg, "msggg");
          // console.log(typeof msg.file, "type"); // Log the type of msg.file
          // console.log(msg.file); // Log the contents of msg.file

          // console.log(msg.msg, "msg.msg.");
          // console.log(msg.holderImgSrc, "image");
          // Convert the array data back to a Blob
          if (msg.file && msg.file?.type) {
            // console.log("inside if");

            const blob = new Blob([msg.file.data], { type: msg.file.type });
            const fileObject = new File([blob], "filename", {
              type: msg.file.type,
            });
            msg.file = fileObject;
            // console.log(msg.file, "file after if");
          }

          setMessages((prevMessages) => {
            setTimeout(() => {
              scrollToLastMessage();
            }, 0);
            return [...prevMessages, msg];
          });
        });
        socket.on("user:connection-count-updated:", (count) => {
          // console.log(count,'count from socketttttt');
          
          setConnectedUsers(count.count);
        });
        // setchatSocket(socket)
      } else {
        toast.error("Not connected to socket server");
      }

      // setSocket(sockett);

      // setLoading(false);

      return () => {
        // if (socket) {
        //   socket.disconnect();
        // }
        // alert("yo")
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const lastMessageRef = React.useRef<HTMLLIElement | null>(null);
    const scrollToLastMessage = () => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest", // Adjusted option for better scrolling behavior
        });
      }
    };

    function getFormattedDate() {
      var date = new Date();
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // months are zero indexed
      var day = ("0" + date.getDate()).slice(-2);
      var year = date.getFullYear();

      var hours = Number(("0" + date.getHours()).slice(-2));
      var minutes = ("0" + date.getMinutes()).slice(-2);
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      var strDate = month + "/" + day + "/" + year;
      var strTime = hours + ":" + minutes + " " + ampm;
      return { date: strDate, time: strTime };
    }
    // const [inputMsg, setinputMsg] = useState("");

    const [messages, setMessages] = useState([]);
    // console.log(messages, "messages");

    const handleSendMessage = (e) => {
      e.preventDefault();

      const { date, time } = getFormattedDate();
      // const holders=["naman","saksham","prakhar","vanshika","neel","ted","john","doe","nkirit","kirat","ashuuu"]
      // let holder= holders[Math.round(Math.random()*10)]
      let msg = {
        holder: userName,
        holderImgSrc: img,
        time,
        userId,
        date,
        msg: inputMsg.current.value,
        room: roomId,
      };
      if (socket) {
        socket.emit("msg", msg);
        // console.log(msg);
        inputMsg.current.value = "";
        // setinputMsg("");
      }
    };
    // const room= useSearchParams().get('r')
    return (
      <>
        <Toaster />
        {/* {!loading ? ( */}
        <div
          style={{
            borderRight: "1px solid gray",
            // borderRadius:'19px',
            width: "79%",
            marginLeft: "3%",
            height: "100vh",
            padding: "15px 10px ",
            background: "transparent"
          }}
          className=""
        >
          <div className="flex flex-col gap-3 ">
            <h3 style={{ textAlign: "center", fontSize: "22px", color:"white" }}>
              {selectedRoom}
            </h3>
            <div
              style={{
                display: "flex",
                gap: "5px",
                fontSize: "16px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CiUser color="white" /> <div style={{color:"white"}}>{connectedUsers} Users Online</div>
            </div>
          </div>
          <div
            style={{
              // border: "2px solid green",
              border: "1px solid gray",
              borderRadius: "20px",
              width: "90%",
              height: "93%",
              margin: "auto",
              //   marginTop: "5px",
              padding: "20px 20px",
              position: "relative",
              background:"inherit"
            }}
          >
              <ul
              className="scroll"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                height: "91%",
                overflowY: "auto",
                scrollbarWidth: "thin",
                // scrollbarColor: "#888 #f5f5f5", // Change as needed
                /* For Webkit browsers */
                
              }}
            >
              {messages.map((msg, index) => (
                <li
                  key={index}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                  style={{
                    borderRadius:
                      msg.holder !== userName
                        ? "1px 10px 10px 10px"
                        : "10px 1px 10px 10px",
                    height: "fit-content",
                    // border: "2px solid green",
                    padding: "10px",
                    marginRight: msg.holder === userName ? "15px" : "",
                    minWidth: "40%",
                    width: "fit-content",
                    maxWidth: "60%",
                    fontSize: "16px",
                    alignSelf:
                      msg.holder === userName ? "flex-end" : "flex-start",
                  }}
                  className={`${
                    msg.holder !== userName ? "bg-slate-600" : "bg-zinc-600"
                  } `}
                >
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "3px",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      color:'silver',
                     
                      // border: "2px solid red",
                    }}
                  >
                    <img
                      style={{
                        borderRadius: "50%",
                        height: "33px",
                        width: "33px",
                      }}
                      src={msg.holderImgSrc}
                    />{" "}
                    {msg.holder}
                    <span className="space-x-2" style={{color:"silver"}}>{msg.date}</span>
                    <span className="space-x-2" style={{color:'silver'}}>{msg.time}</span>
                  </div>
                  <div
                    style={
                      {
                        marginTop:'6px'
                      }
                    }
                  >
                    {msg.msg && (
                      <div
                        style={{
                          height: "fit-content",
                          wordWrap: "break-word",
                          // border: "2px solid pink",
                          color:"white"
                        }}
                      >
                        {msg.msg}
                      </div>
                    )}
                  </div>
                  {/* {msg.file && msg.file.type.startsWith("image/") ? (
          <img src={URL.createObjectURL(msg.file)} alt="Selected File" style={{ maxWidth: "100%", maxHeight: "200px" }} />
        ) : (
          <p>{msg.file.name}</p>
        )} */}
                  {msg?.file && (
                    <div className="relative group">
  <MdOutlineZoomOutMap color="white" size="25" style={{left:"50%",top:'50%',transform:"translate(-50%,-50%)"}} className="absolute hidden group-hover:block"/>
                    <ModalImage
                      small={msg.file}
                      large={msg.file}
                
                      alt="Selected File"
                      />
                      </div>
                  )}
                </li>
              ))}
            </ul>
            <div
              style={{
                padding: "10px",
                position: "absolute",

                bottom: "5px",
                left: "69px",
                width: "85%",
                display: "flex",
                // border:"1px solid black",
                // borderRadius:'10px',
                justifyContent: "center",
                alignItems: "center",
                gap: "21px",
              }}
            >
              <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                <IoFolderOpenOutline color="white" size={30} />
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <input
                ref={inputMsg}
                type="text"
                id="first_name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(e);
                  }
                }}
                // value={inputMsg}
                // onChange={(e) => setinputMsg(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-4"
                placeholder="Enter Message"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </div>
        {/* ) : (
          <div className="w-full h-screen flex justify-center items-center">
            {" "}
            <Spinner />
          </div>
        )} */}
      </>
    );
  };

  export default ChatPage;
