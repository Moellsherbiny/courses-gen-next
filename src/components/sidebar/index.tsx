"use client";
import Student from "@/components/sidebar/Student"
import Teacher from "@/components/sidebar/Student"
import { Sidebar, SidebarFooter } from "@/components/ui/sidebar"
import { signOut } from "next-auth/react";

export function AppSidebar({ userRole }: { userRole: "teacher" | "student" }) {
  const isTeacher: boolean = userRole === "teacher";
  return (
    <Sidebar side="right">
      {isTeacher ? <Teacher /> : <Student />}
      <SidebarFooter>
        <button className="w-full py-2 bg-red-500 text-white rounded-md" onClick={() => signOut()}>
          تسجيل الخروج
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}
