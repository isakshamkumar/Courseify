import bcrypt from 'bcrypt'
import prisma from '../../../../../prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request:NextRequest){
    const body = await request.json();
    console.log(body,'bodyyyyyy');
    
    const { firstName,lastName, email, password } = body;

    if(!firstName || !lastName || !email || !password) {
        return new NextResponse('Missing Fields', { status: 400 })
    }

    const exist = await prisma.user.findUnique({
        where: {
            email
        }
    });
    

    if(exist) {
        throw new Error('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);


    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            hashedPassword
        }
    });

    return NextResponse.json(user)
}