"use client";
import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { CiUser } from "react-icons/ci";
import Button from "../Button";
import { IoFolderOpenOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

// const img =
//   "https://images.pexels.com/photos/5273062/pexels-photo-5273062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
type Props = {};

// const demoMessages = [
//   {
//     holder: "Saksham",
//     msg: "Hii sir,can you help me how to extend my current course which I joined in 2023 ? anyone help me, thank",
//     holderImgSrc: img,
//     time: "9:33 PM",
//     date: "01/27/2024",
//   },
//   {
//     holder: "vijaydev ",
//     msg: "okk thanks for the info",
//     holderImgSrc: img,
//     time: "9:33 PM",
//     date: "01/27/2024",
//   },
//   {
//     holder: "TA Rushikesh G",
//     msg: "Everything what was taught in this cohort upto typescript",
//     holderImgSrc: img,
//     time: "9:33 PM",
//     date: "01/27/2024",
//   },
//   {
//     holder: "_jackCruiser800",
//     msg: "Hey guys any one that has solved any one of these problems?",
//     holderImgSrc: img,
//     time: "9:33 PM",
//     date: "01/27/2024",
//   },
//   {
//     holder: "Buddy",
//     msg: "Hi everyone, is anyone able to open https://harkirat.classx.co.in/, i am seeing error and wanted to view some videos of the cohort. Could someone please help",
//     holderImgSrc: img,
//     time: "9:33 PM",
//     date: "01/27/2024",
//   },
//   {
//     holder: "Muhammad Noorani ",
//     msg: "One question @GurkiratEven I was left behind due to college and somany things, just a doubt. The cohort 1 videos will never get depreciated with updates in react and expressjs na, as I always get this doubt that if I see the videos now",
//     holderImgSrc: img,
//     time: "9:33 PM",
//     date: "01/27/2024",
//   },
// ];


const ChatPage = (props: Props) => {
  const [connectedUsers,setConnectedUsers]=useState(0)
  //@ts-ignore
  const userName= useSelector(state=>state.user.user.name)
    //@ts-ignore

  const userId= useSelector(state=>state.user.user.id)
    //@ts-ignore
  const img= useSelector(state=>state.user.user.image)
  const [socket, setSocket] = useState(null);
  useEffect(()=>{
    const connectToSocket=async()=>{
      const socket = await io('http://localhost:3001');
      if(socket){
        // alert("connected")
        
  
      }
      setSocket(socket);
      socket.on("user:connection-count-updated",(count)=>{
setConnectedUsers(count.count)
      })
      socket.on('chat:new-message', (msg) => {
        // msg.holderImgSrc=img;
        console.log(msg,'msggg');
        console.log(msg.msg,'msg.msg.');
        // console.log(Jsomsg.msg,'tostring');
        // console.log(JSON.parse(msg),'msgggggggggggggggggg');
        
        

        
        setMessages((prevMessages) => {
          setTimeout(() => {
                  scrollToLastMessage();
                }, 0);
          return [...prevMessages, msg.msg]
        } );
      });
    }
    connectToSocket()
   
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };

  },[])
  const lastMessageRef = React.useRef<HTMLLIElement | null>(null);
  const scrollToLastMessage = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest', // Adjusted option for better scrolling behavior
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
  const[inputMsg,setinputMsg]=useState("")
  const [messages, setMessages] = useState([]);
  // const handleSendMessage = () => {
  
  //   setMessages((prevMessages) => {
  //     const { date, time } = getFormattedDate();
  //     let newMsg = {
  //       holder: "saksham",
  //       msg: inputMsg,
  //       holderImgSrc: img,
  //       time,
  //       date,
  //     };
  //     setinputMsg('')
  //     setTimeout(() => {
  //       scrollToLastMessage();
  //     }, 0);
 
  //     return [...prevMessages,newMsg];
  //   });
  // };
  const handleSendMessage=(e)=>{
    e.preventDefault()
    
  
    const{date,time}=getFormattedDate();
// const holders=["naman","saksham","prakhar","vanshika","neel","ted","john","doe","nkirit","kirat","ashuuu"]
// let holder= holders[Math.round(Math.random()*10)]
    let msg={
    holder:userName,
    holderImgSrc:img,
    time,
    userId,
    date,
    msg:inputMsg
    }
    if(socket){
      socket.emit("msg",JSON.stringify(msg));
      setinputMsg('');
    }
  }
 
  return (
    <div
      style={{
        // border: "2px solid red",
        width: "100%",
        height: "100vh",
        padding: "15px 10px "
      }}
      className=""
    >
      <div className="flex flex-col gap-3 ">
        <h3 style={{ textAlign: "center", fontSize: "22px" }}>
          Front End Development
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
          <CiUser /> {connectedUsers} Users Online
        </div>
      </div>
      <div
        style={{
          border: "2px solid green",
          borderRadius:"20px",
          width: "90%",
          height: "93%",
          margin: "auto",
          //   marginTop: "5px",
          padding: "20px 20px",
          position: "relative",
        }}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            // border: "2px solid red",
            height: "91%",
            overflowY: "scroll",
            scrollbarWidth: "thin",
          }}
        >
          {messages.map((msg, index) => (
            <li
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
              style={{
                borderRadius:msg.holder!==userName? "1px 10px 10px 10px":'10px 1px 10px 10px',
                height: "fit-content",
                padding: "10px",
                marginRight:msg.holder===userName?'15px':'',
                minWidth:'450px',
                width: "fit-content",
                maxWidth: "90%",
                fontSize:'16px',
                alignSelf:msg.holder===userName?'flex-end':'flex-start'
              }}
              className={`${
                msg.holder !== userName ? "bg-slate-300" : "bg-zinc-200"
              } `}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: "3px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  style={{ borderRadius: "50%", height: "33px", width: "33px" }}
                  src={img}
                />{" "}
                {msg.holder}
                <span className="space-x-2">{msg.date}</span>
                <span className="space-x-2">{msg.time}</span>
              </div>
              {msg.msg}
            </li>
          ))}
        </ul>
        <div
          style={{
            padding: "10px",
            position: "absolute",
            
            bottom: "5px",
            left:'69px',
            width: "85%",
            display: "flex",
            // border:"1px solid black",
            // borderRadius:'10px',
            justifyContent: "center",
            alignItems: "center",
            gap: "21px",
          }}
        >
          <IoFolderOpenOutline size={30}/>
          <input
            type="text"
            id="first_name"
            onKeyDown={(e)=>{if(e.key==="Enter"){handleSendMessage(e)}}}
            value={inputMsg}
            onChange={(e)=>setinputMsg(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-4"
            placeholder="Enter Message"
          />
          <Button  onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
