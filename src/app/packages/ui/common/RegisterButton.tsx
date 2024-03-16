"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
type FormData = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

const RegisterButton = ({
  formData,
  method,
  role,
}: {
  formData: FormData;
  method: string;
  role: string;
}) => {
  const router = useRouter();
  const session = useSession();
  // console.log(
  //   session,
  //   "sesssssionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
  // );

  // console.log(role, "from", method);
  const signinHandler = async () => {
    signIn("credentials", { ...formData,signin:true, redirect: false }).then((callback) => {
      if (callback?.error) {
        alert(callback.error);
        alert(JSON.stringify(callback));
      }

      if (callback?.ok && !callback?.error) {
        alert("Logged in successfully!");
      }
    });
  };
  const signupHandler = async () => {
    signIn("credentials", { ...formData, redirect: false }).then((callback) => {
      if (callback?.error) {
        alert(callback.error);
        alert(JSON.stringify(callback));
      }

      if (callback?.ok && !callback?.error) {
        alert("Registered in successfully!");
      }
    });
  };
  // console.log(formData, "formdataaaaaaaa");

  return (
    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
      {method === "Signup" ? (
        <>
          <button
            onClick={signupHandler
            }
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Create an account
          </button>
          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Already have an account?
            <button
              onClick={() => router.push(`/${role}/signin`)}
              className="text-gray-700 underline"
            >
              Log in
            </button>
            .
          </p>
        </>
      ) : (
        <>
          {" "}
          <button
            onClick={signinHandler
            }
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Login
          </button>
          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Dont have an account?
            <button
              onClick={() => router.push(`/${role}/signup`)}
              className="text-gray-700 underline"
            >
              Sign Up
            </button>
            .
          </p>
        </>
      )}
    </div>
  );
};

export default RegisterButton;
