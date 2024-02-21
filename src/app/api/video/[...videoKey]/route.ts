import s3Client from "@/app/packages/s3/client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Extract the pathname from the request URL
  const pathname: string | undefined = request?.nextUrl?.pathname;
  console.log(pathname);

  // Decode the pathname and extract the video key
  const decodedPathname: string = decodeURIComponent(pathname || '');
  const videoKey: string | undefined = decodedPathname.split('video/').pop();
  console.log('video key', videoKey);

  // Ensure the videoKey is defined before proceeding
  if (!videoKey) {
    return NextResponse.json({ error: 'Video key is missing' }, { status: 400 });
  }

  // Create a command to get the object from S3
  const command = new GetObjectCommand({
    Bucket: "courseifyprivatebucket",
    Key: videoKey
  });

  // Generate a signed URL for the S3 object
  try {
    const url: string = await getSignedUrl(s3Client, command);
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return NextResponse.json({ error: 'Error generating signed URL' }, { status: 500 });
  }
}
