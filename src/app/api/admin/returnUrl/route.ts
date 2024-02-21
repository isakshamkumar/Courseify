//add middlewares toooo
//add zod too
import s3Client from '@/app/packages/s3/client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { NextRequest, NextResponse } from 'next/server'
//what this will doo
//this will get the meta deta for a object to be uploaded b admin/author
//and will return a presigned url on the behaf of the node js connected client
//and then we make a put req to that signed url with our binary file(postman)
export async function POST(request:NextRequest){
    const {fileName,contentType}=await request.json()
    // console.log(fileName);
    // console.log(contentType);
    
    const command = new PutObjectCommand({
        Bucket: "courseifyprivatebucket",
        ContentType: contentType,
        Key: `uploads/user-uploads/${Date.now()}-${fileName}`
    })

    const signedURL = await getSignedUrl(s3Client, command)
    return NextResponse.json({url:signedURL})

   
}

