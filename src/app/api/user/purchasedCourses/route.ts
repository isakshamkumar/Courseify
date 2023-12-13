import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { headers } from "next/headers";
export async function GET(request: NextRequest) {
  console.log("hi");
  const headersList = headers();
  const userId = headersList.get("userId").toString();

  // console.log(userId);

  // Check if the user exists
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        return NextResponse.json({ error: 'User not found' });
      }

      // Fetch the user's purchased courses
      const purchasedCourses = await prisma.user.findUnique({
        where: { id: userId },
        select: { purchasedCourses: true },
      });
    // console.log(purchasedCourses);

  return NextResponse.json({ purchasedCourses });
}
