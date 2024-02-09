import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../prisma/client'
import { getToken } from "next-auth/jwt";
export async function GET(req:NextRequest){
    // console.log(req.cookies,'cookied');
    
  const token = await getToken({ req, secret: '4545454545454545454545454' })  // Use an environment variable for the secret
//   console.log(token,'tokennnnnnn');

    const user=await prisma.user.findUnique({
        where:{
            email:token?.email || ''
        }
    })
    // console.log(user,'userrrrrrrrrrrrrrrrrfrom backend');
    
    if(!user) return new Response("User not found",{status:401})


return NextResponse.json({user})

}