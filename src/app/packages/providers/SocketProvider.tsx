// SocketProvider.js
"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "@/app/packages/hooks/useSocket";
import SocketContext from "../context/SocketContext";
import { io } from "socket.io-client";


export const SocketProvider = ({ children }) => {
    // const socket = useSocket();
const[socket,setsocket]=useState(null)
  useEffect(()=>{
// console.log('Socker provider added');
setsocket(io('http://localhost:3001'))

return ()=>{
  // console.log('Socker provider removed');
setsocket(null)
}
  },[])
useEffect(()=>{
// console.log(socket,'from socketprovider');

},[socket])

  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  );
};  

