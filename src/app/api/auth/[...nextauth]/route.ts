import NextAuth from "next-auth/next";
import { authOptions } from "@/app/packages/lib/auth";


//@ts-expect-error
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
