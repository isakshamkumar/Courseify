import NextAuth from "next-auth/next";
import prisma from '../../../../../prisma/client'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from 'bcrypt'

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: '52e09ef023711c60003d' || '52e09ef023711c60003d',
            clientSecret: '5e3b91d689505a7328d1725cd833328fde590623' || '5e3b91d689505a7328d1725cd833328fde590623',
            
        }),
        GoogleProvider({
            clientId: '604488456227-2r25b0ab74k4fo34vkertdql3dl1gimg.apps.googleusercontent.com' || '604488456227-2r25b0ab74k4fo34vkertdql3dl1gimg.apps.googleusercontent.com',
            clientSecret: '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' || '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',
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "ksaksham39@gmail.com" },
                password: { label: "Password", type: "password",placeholder:"123" },
                username: { label: "Username", type: "text", placeholder: "John Smith" },
            },
            async authorize(credentials) {
                console.log('authotize callledddddddddddddddddddddddddddddddddddddddddddddddd');
                const rand= Math.random.toString()
              const user={id: 'unique-id', name: 'ksaksham' }
                // check to see if email and password is there
                // if(!credentials.email || !credentials.password) {
                //     throw new Error('Please enter an email and password')
                // }

                // // check to see if user exists
                // const user = await prisma.user.findUnique({
                //     where: {
                //         email: credentials.email
                //     }
                // });

                // // if no user was found 
                // if (!user || !user?.hashedPassword) {
                //     throw new Error('No user found')
                // }

                // // check to see if password matches
                // const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                // // if password does not match
                // if (!passwordMatch) {
                //     throw new Error('Incorrect password')
                // }

                return user;
            },
        }),  
    ],
    secret: '4545454545454545454545454',
    session: {
        strategy:"jwt",
    },
    debug: process.env.NODE_ENV === "development",
    
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}
