"use client";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

// import Signup from "./packages/ui/users/components/Signup";

export default function Home() {
  const router = useRouter();
  const session=useSession()
  console.log(session);
  if(session?.data?.user){
    router.push("/home");
  }
  
  return (
    <>
      <section className=" h-screen overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto h-full gap-8 max-w-xl flex flex-col justify-center items-center text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Welcome to CourseIfy
            </h2>

            <p className="hidden text-gray-500 md:mt-4 md:block">
            Discover, learn, and grow with our Course App! Dive into a variety of courses designed to boost your skills and knowledge. From tech to creativity, we've got you covered. Start your learning journey today!
            </p>

            <div className="mt-4 md:mt-8">
              <button
                onClick={() => router.push("/home")}
                className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>

        <img
          alt="Student"
          src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-56 w-full object-cover sm:h-full"
        />
      </section>
     
    </>
  );
}
