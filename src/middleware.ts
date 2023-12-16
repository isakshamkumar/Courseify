import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import prisma from '../prisma/client';
import { User } from '@prisma/client'; // Import the User type from Prisma



export async function middleware(req: NextRequest) {
    console.log('middlware calledddddd');
    
  const token = await getToken({ req, secret: '4545454545454545454545454' })  // Use an environment variable for the secret
  console.log(token,'tokennnnnnn');
  console.log(token?.email);
  

  if (!token?.email) {
    // If the token or email does not exist, redirect the user to the login page
    return NextResponse.redirect('/user/signin');
  }

  const user: User | null = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });

  if (!user) {
    // If the user does not exist, redirect the user to the login page
    return NextResponse.redirect('/user/signin');
  }

  // If the user exists, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: '/api/courses'
};
