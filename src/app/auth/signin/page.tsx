"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { ArrowLeft } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleCredentialsSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Sign in with credentials; adjust callbackUrl as needed
    signIn("credentials", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" dir="rtl">
      <Logo />
      <div className="w-full max-w-xl p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">تسجيل الدخول</h1>
        <form onSubmit={handleCredentialsSignIn} className="space-y-4">
          <div className="w-full flex justify-between items-center">
            <Label htmlFor="email" className="min-w-32 inline-block">البريد الإلكتروني</Label>
            <Input
              type="email"
              id="email"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="min-w-32 inline-block">كلمة المرور</Label>
            <Input
              type="password"
              id="password"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="default" className="w-full">
            دخول
          </Button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-500">أو</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          variant="ghost"
          className="w-full flex items-center justify-center"
        >
          دخول بواسطة جوجل
          <FcGoogle />
        </Button>
        <Button variant="link" className="mt-4 w-full">
          <Link href="/auth/signup" className="w-40 flex justify-evenly items-center">
            إنشاء حساب جديد
            <ArrowLeft />
          </Link>
        </Button>
      </div>
    </div>
  );
}
