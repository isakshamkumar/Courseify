"use client";
import React, { useEffect } from "react";
import { BiLogoNodejs, BiLogoReact } from "react-icons/bi";
import { DiDatabase } from "react-icons/di";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { io } from "socket.io-client";
import SocketContext from "@/app/packages/context/SocketContext";
import { Toaster, toast } from 'react-hot-toast';
import { useSocket } from "@/app/packages/hooks/useSocket";
type Props = {};

const ChatModal = (props: Props) => {
  // console.log('chat modal');
  
  const joinedChatServerList = [
    {
      icon: <BiLogoReact />,
      name: "Front end Development",
      id: "f222db6c-d667-48ac-b223-ca000b0b390d",
    },
    {
      icon: <BiLogoNodejs />,
      name: "Node js",
      id: "dee0dbcd-717b-4b02-a730-ed256916a8fa",
    },
    {
      icon: <BiLogoNodejs />,
      name: "Backend Development",
      id: "fe65e76c-215e-4212-a498-02d8c712bb63",
    },
    {
      icon: <DiDatabase />,
      name: "Devops",
      id: "31678ce7-9be6-41d4-82ab-e8bd63ca63d1",
    },
  ];
  const router = useRouter();
  const {socket}=useContext(SocketContext)
  const handleJoinChatServer = (id: string, room: string) => {
    alert(`Do you want to Join ${room} Chat Room?`);
   socket.emit("joinRoom", { room:id });
    router.push(`/chat/room?r=${room}&id=${id}`);
  };
// // const socketFunc=useContext(SocketContext)
// const sockett=useSocket()
useEffect(()=>{
  socket?.on("user:connection-count-updated:", (count) => {
    // console.log(count,'count from socketttttt reciecefdwdw');
    localStorage.setItem("connectedUserCount", count.count);
    
    // setConnectedUsers(count.count);
  });
},[socket])
// console.log("sockethaiiiiiiiiiiiiiiiiiiiii from modal",socket)
if(socket?.connected){
  toast.success("Socket Connected");
  // console.log(socket,'from if in useeffect in modal');
} else {
// console.log(socket,'from else in useeffect in modal');

  toast.error("Error connecting to Server");
  // alert("Error connecting to Server");
}
;
  
  return (
    <div className="h-screen relative w-full flex justify-center items-center bg-zinc-800">
      <div className="text-white" style={{position:'absolute',top:'10px',right:'5rem'}}>{`Connected: ${socket?.connected}`}</div>
      <Toaster/>
      <div className="h-[40rem] w-[50rem] bg-slate-700 rounded-2xl text-white p-10">
        <h1 className="text-center text-3xl font-extrabold ">
          Welcome to the Courseify Chat
        </h1>
        <p className="text-center text-lg mt-4">
          Browse From a List Of Available Rooms or Create One.
        </p>
        <div className="flex justify-center items-center">
          <input
            type="text"
            className="py-2 px-5 w-3/6  mt-3 focus:outline-none rounded-sm    text-black"
            placeholder="Enter Server Name..."
          />
        </div>
        <div>
          {joinedChatServerList.map((server, i) => (
            <li
              onClick={() => handleJoinChatServer(server.id, server.name)}
              style={{
                textDecoration: "none",
                listStyle: "none",
                minWidth: "8rem",
                width: "24rem",
                height: "3rem",
                borderRadius: "8px",
                margin: "1rem auto",
              }}
              className="flex gap-2 justify-center items-center text-xl bg-slate-600 hover:bg-slate-400 p-5 hover:cursor-pointer"
              key={i}
            >
              {server.icon}
              {server.name}
            </li>
          ))}
        </div>
        <div className="flex justify-center items-center flex-col gap-2">
          <label className="block text-2xl">Create Server</label>
          <div className="w-full  flex justify-center items-center">
            <input
              type="text"
              className="py-2 px-4 w-4/6 focus:outline-none rounded-sm text-black"
              placeholder="Enter Server Name..."
            />
            <Button onClick={() => {}}>Create Server</Button>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default ChatModal;
