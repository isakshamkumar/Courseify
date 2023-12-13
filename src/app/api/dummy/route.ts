//add middlewares toooo
import prisma from "../../../../prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const userId="6573562edb4374c30a75ee00";
    // const videoId="6574b3736c3838eec9bf3b66"
    // const video=await prisma.video.findUnique({
    //     where:{
    //         id:'6574b3736c3838eec9bf3b66'
    //     },
    //     include:{
    //         userProgress:true
    //     }
    // })
    // const user= await prisma.user.findUnique({
    //     where:{
    //         id:userId
    //     },
    //     include:{
    //         purchasedCourses:true
    //     }
    // })
//   const newUserVideoProgress=await prisma.userVideoProgress.create({
//     //
    
//     data:{
//         user:{
//             connect:{
//                 id:userId
//             }
//         },
//         video:{
//             connect:{
//                 id:videoId
//             }
//         },
//         progress:0,
//         completed:false
        
//     }
//   })
    // return NextResponse.json({newUserVideoProgress})
    
    // return NextResponse.json({user})
    const user= await prisma.user.findUnique({
        where:{
            id:'6573562edb4374c30a75ee00'
        },
        include:{
            purchasedCourses:true
        }
    })
    return NextResponse.json({user})

  //  now every video returned by this result has a key and we gonna then map these with our videosidemenu list items, then onlick of any of them we make a req to the video/[videokey] route which returns the signed url then we render that
}
