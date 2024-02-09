import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideMenu from "./packages/ui/common/SideMenu";
import AuthProvider from "./packages/providers/AuthProvider";
import CheckSession from "./packages/providers/CheckSession";
import CheckOnlineStatus from "./packages/providers/CheckOnlineStatus";
import { Suspense } from "react";
import Loading from "./loading";
import StoreProvider from "./packages/providers/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Courseify",
  description: "One Stop Platform for all your Learning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Suspense fallback={<Loading/>}> */}
        <StoreProvider>
          <AuthProvider>
            {/* <CheckSession> */}

            <CheckOnlineStatus>
              <SideMenu />
              {/* <div className='p-10'> */}
              {children}

              {/* </div> */}

              {/* </CheckSession> */}
            </CheckOnlineStatus>
          </AuthProvider>
        </StoreProvider>

        {/* </Suspense> */}
      </body>
    </html>
  );
}
