"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { axiosInstance } from "@/lib/axiosInstance";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast("حدث خطأ", {
        description: "كلمتا المرور غير متطابقتين",

      })
      return;
    }
    // Call your signup API endpoint; adjust URL and logic as needed.
    try {
      const res = await axiosInstance.post("/auth/register", {

        name, email, password
      });
      if (res.status !== 200) toast("الرجاء المحاولة مرة اخري مع بريد الكتروني اخر");
      toast("تم إنشاء الحساب بنجاح");
      // Optionally, auto-login or redirect to sign in page:
      signIn("credentials", { email, password });
    } catch (error) {
      console.error(error);
      toast("حدث خطأ أثناء إنشاء الحساب")
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4" dir="rtl">
      <Logo />
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">إنشاء حساب جديد</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="name" className="min-w-32 inline-block">الاسم</Label>
            <Input
              type="text"
              id="name"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex justify-between items-center ">
            <Label htmlFor="email" className="min-w-32 inline-block">البريد الإلكتروني</Label>
            <Input
              type="email"
              id="email"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="flex justify-between items-center">
            <Label htmlFor="confirmPassword" className="min-w-32 inline-block">تأكيد كلمة المرور</Label>
            <Input
              type="password"
              id="confirmPassword"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button variant="default" type="submit" className="w-full">
            إنشاء الحساب
          </Button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-500">أو</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <Button
          onClick={() => signIn("google")}
          variant="outline"
          className="w-full flex items-center justify-center"
        >
          التسجيل بواسطة جوجل
          <FcGoogle />
        </Button>
        <Button variant="link" className="mt-4 w-full ">
          <Link href="/auth/signin" className="w-32 flex justify-evenly  items-center">
            <span>
              تسجيل الدخول
            </span>
            <ArrowLeft />
          </Link>
        </Button>
      </div>
    </div>
  );
}
