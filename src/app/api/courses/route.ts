//add middlewares toooo
import prisma from "../../../../prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //grt course id from lets say header
  
  const courses = await prisma.course.findMany();
    return NextResponse.json({courses})

  //  now every video returned by this result has a key and we gonna then map these with our videosidemenu list items, then onlick of any of them we make a req to the video/[videokey] route which returns the signed url then we render that
}
