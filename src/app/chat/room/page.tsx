"use client";
import Spinner from "@/app/packages/ui/common/Spinner";
import ChatPage from "@/app/packages/ui/common/chat/ChatPage";
import ChatServerMenu from "@/app/packages/ui/common/chat/ChatServerMenu";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const room = useSearchParams().get("r");
  const [selectedRoom, setSelectedRoom] = useState<string>(room);
  return (
    <>
      {!loading ? (
        <div className="flex " style={{ background: "radial-gradient(circle at center, #1C1425, #18132A)" }}>
          {/* <ChatServerMenu
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          /> */}

          <ChatPage selectedRoom={selectedRoom} />
            <ChatServerMenu
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <Spinner /> Loading Chat Portal...
        </div>
      )}
    </>
  );
};

export default Page;
