"use client";
import React, { useEffect, useState } from "react";
import ChatServerMenu from "../packages/ui/common/chat/ChatServerMenu";
import ChatPage from "../packages/ui/common/chat/ChatPage";
import Spinner from "../packages/ui/common/Spinner";
import { useSearchParams } from "next/navigation";
import ChatModal from "../packages/ui/common/Modals/ChatModal";

type Props = {};

const Page = (props: Props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const room= useSearchParams().get("room")
  const [selectedRoom,setSelectedRoom]=useState<string>(room)

  return (
    <>
<ChatModal/>
      {/* {!loading ? (
        <div className="flex  ">
          <ChatServerMenu selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />

          <ChatPage selectedRoom={selectedRoom} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <Spinner /> Loading Chat Portal...
        </div>
      )} */}
    </>
  );
};

export default Page;
