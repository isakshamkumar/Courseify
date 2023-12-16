import bcrypt from 'bcrypt';
import prisma from '../../../../../prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@prisma/client';

// add zod
interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const body: CreateUserRequest = await request.json();
  
  const { firstName, lastName, email, password } = body;

  if (!firstName || !lastName || !email || !password) {
    return new NextResponse('Missing Fields', { status: 400 });
  }

  // const existingUser: User | null = await prisma.user.findUnique({
  //   where: {
  //     email,
  //   },
  // });

  // if (existingUser) {
  //   return NextResponse.json({ error: true, message: 'User Already Exists with Provided Email' }, { status: 400 });
  // }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user: User = await prisma.user.create({
    data: {
      firstName,
      lastName,
      name:firstName,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user, { status: 200 });
}
