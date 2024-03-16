import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SocketProvider } from "../packages/providers/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Courseify",
  description: "One Stop Platform for all your Learning",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Suspense fallback={<Loading/>}> */}
      <SocketProvider>
       
        {children}
      </SocketProvider>
      {/* </Suspense> */}
    </>
  );
}
