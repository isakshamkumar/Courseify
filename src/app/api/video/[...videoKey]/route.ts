//add middlewares toooo
import s3Client from "@/app/packages/s3/client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { NextRequest, NextResponse } from "next/server";
//what this will doo
//this will get the key of the video to be viewed
//and will return a presigned url on the behaf of the node js connected client
export async function GET(request: NextRequest) {

const pathname = request?.nextUrl?.pathname;
console.log(pathname);

const decodedPathname = decodeURIComponent(pathname);
const videoKey = decodedPathname.split('video/').pop();
console.log('video key',videoKey);



  


  const command = new GetObjectCommand({
      Bucket: "courseifyprivatebucket",
      Key: videoKey
  })
  const url = await getSignedUrl(s3Client, command);
  return NextResponse.json({ url });
}

