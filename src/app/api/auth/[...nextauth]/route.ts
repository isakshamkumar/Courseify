import NextAuth from "next-auth/next";
import prisma from "../../../../../prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
type AuthorizeCredentials = {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    signin?: boolean;
    redirect?: boolean;
    csrfToken?: string;
    callbackUrl?: string;
    json?: boolean;
  };
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: "52e09ef023711c60003d" || "52e09ef023711c60003d",
      clientSecret:
        "5e3b91d689505a7328d1725cd833328fde590623" ||
        "5e3b91d689505a7328d1725cd833328fde590623",
    }),
    GoogleProvider({
      clientId:
        "604488456227-2r25b0ab74k4fo34vkertdql3dl1gimg.apps.googleusercontent.com" ||
        "604488456227-2r25b0ab74k4fo34vkertdql3dl1gimg.apps.googleusercontent.com",
      clientSecret:
        "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" ||
        "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",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        firstName: { label: "First Name", type: "text", placeholder: "John" },
        lastName: { label: "Last Name", type: "text", placeholder: "Doe" },
        email: {
          label: "Email",
          type: "text",
          placeholder: "ksaksham39@gmail.com",
        },
        password: { label: "Password", type: "password", placeholder: "123" },
      },
      async authorize(credentials:AuthorizeCredentials|undefined) {
        //so 2 ways here, either on the signup page, register a user with the user register endpoint and then navigate them to /signin page and make them put their credientials
        //or put the entire user entered details (both login and signup)  in this authorize function
        //we are going with the second approach

        let user;
        console.log(credentials?.signin);
        
        try {
          // check to see if email and password(bare minimum) is there
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please enter an email and password");
          }
          // // check to see if user exists
          const existingUser = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          if (!existingUser && !credentials?.signin) {
            const response = await fetch(
              "http://localhost:3000/api/user/register",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  firstName: credentials?.firstName,
                  lastName: credentials.lastName,
                  email: credentials.email,
                  password: credentials.password,
                }),
              }
            );
            if (!response.ok) {
              console.log(
                "response is not okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
              );
            }
            const data = await response.json();
            console.log(data);
            user=data.user;
        }
        if(!existingUser && credentials?.signin){
            throw new Error("This User Does not exists!, Signup")
        }
        if(existingUser){
            // making sure that if someone has logged in throigh goggle then they cannot just put their that email and login with that, they have to login with google only then!!
              if ( !existingUser?.hashedPassword) {
                throw new Error(
                  "Sign Up with appropriate Provider Only that you used to create account"
                );
              }
              //now till now we have made sure that agar user exist karta h with providers email and the email provided is also same then he should not be able to login
    
              //now below code for registered users with hash passwords
    
              // // check to see if password matches
              const passwordMatch = await bcrypt.compare(
                credentials.password,
                existingUser.hashedPassword
              );
    
              // // if password does not match
              if (!passwordMatch) {
                throw new Error("Incorrect password");
              }else{
                user=existingUser;
              }

        }
        
        } catch (error) {
          console.log(error);
        }

        return user;
      },
    }),
  ],
  secret: "4545454545454545454545454",
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
