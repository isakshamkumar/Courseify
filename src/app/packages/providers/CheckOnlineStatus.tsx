"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const CheckOnlineStatus = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName=usePathname()

  useEffect(() => {
    const handleOffline = () => {
      // Save the current page pathname in local storage
      localStorage.setItem('offlineRedirect',pathName);
      router.push('/not-online');
    };

    const handleOnline = () => {
      // Get the original page pathname from local storage
      const offlineRedirect = localStorage.getItem('offlineRedirect');
      if (offlineRedirect) {
        router.push(offlineRedirect);
        // Clear the stored offlineRedirect value
        localStorage.removeItem('offlineRedirect');
      }
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Cleanup: Remove event listeners on component unmount
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []); // Add dependencies if needed

  return <div>{children}</div>;
};

export default CheckOnlineStatus;
