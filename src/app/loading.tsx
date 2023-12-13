'use client'
import React from "react";
import LoadingBar from "react-top-loading-bar";
import Spinner from "./packages/ui/common/Spinner";
const loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoadingBar
      height={5}
        color="#f11946"
        progress={65}
        onLoaderFinished={() => console.log("finished")}
      />
      <Spinner />
      <p>Loading...</p>
    </div>
  );
};

export default loading;
