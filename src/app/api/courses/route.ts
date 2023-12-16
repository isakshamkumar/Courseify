import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { Course } from "@prisma/client";

export async function GET(request: NextRequest) {
  const courses: Course[] = await prisma.course.findMany();
  //change userID field in the schema!!!!!!!!
  return NextResponse.json({ courses }, { status: 200 });
}
