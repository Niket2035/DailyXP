"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");      
  const [pass, setpass] = useState("");      

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white  shadow-xl rounded-2xl p-8 border ">

        <h2 className="text-2xl font-bold text-center">
          Login to your account
        </h2>

        <p className="text-sm text-center mt-2">
          Enter your email below to login
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">

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
              placeholder="xxxxxx"
              value={pass}
              onChange={((e)=>setpass(e.target.value))}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50  focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-black text-white font-medium hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link href="/account/register" className="font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
