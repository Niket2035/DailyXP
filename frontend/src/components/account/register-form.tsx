"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      const res=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/register`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          name:name,
          email:email,
          password:pass
        })
      })
      const data = await res.json();
      console.log("Response:", data);
      
      if(res.ok){
        toast.success("Registration successful!")
        window.location.href="/dashboard"
      }
      console.log(res);
    }catch(err){
      toast.error("Registration failed!")
      console.error("Register error:",err)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100  px-4">
      <div className="w-full max-w-md bg-white  shadow-xl rounded-2xl p-8 border ">

        <h2 className="text-2xl font-bold text-center">
          Create an account
        </h2>

        <p className="text-sm text-center mt-2">
          Enter your details below to create your account
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">

          <div>
            <label className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium ">
              Email
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50  focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              placeholder="xxxxx"
              value={pass}
              onChange={(e) => setpass(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50  focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
            />
          </div>

           <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-black text-white font-medium hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        {/* <div className="flex items-center my-6">
          <div className="flex-1 border-t dark:border-gray-700"></div>
          <span className="px-3 text-sm text-gray-500">
            OR CONTINUE WITH
          </span>
          <div className="flex-1 border-t dark:border-gray-700"></div>
        </div>

        <button className="w-full py-2.5 border rounded-lg dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          Continue with Google
        </button> */}

        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/account/login" className="font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
