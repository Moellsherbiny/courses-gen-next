"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  FilePlus,
  Book,
  BarChart,
  MessageCircle,
  ClipboardList,
  BookOpen,
  Bookmark,
  PieChart,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button";

const teacherLinks = [
  {
    title: "الرئيسية",
    url: "/",
    icon: Home,
  },
  {
    title: "الطلاب",
    url: "/teacher/students",
    icon: Users,
  },
  {
    title: "إنشاء دورة تعليمية",
    url: "/teacher/courses/new",
    icon: FilePlus,
  },
  {
    title: "الدورات التعليمية",
    url: "/teacher/courses",
    icon: Book,
  },
  {
    title: "إحصائيات الطلاب",
    url: "/teacher/analysis",
    icon: BarChart,
  },
  {
    title: "إرسال ملاحظات",
    url: "/teacher/feedback",
    icon: MessageCircle,
  },
  {
    title: "إنشاء اختبار",
    url: "/teacher/quiz/new",
    icon: ClipboardList,
  },
];

const studentLinks = [
  {
    title: "الرئيسية",
    url: "/student",
    icon: Home,
  },
  {
    title: "الدورات التعليمية",
    url: "/student/courses",
    icon: BookOpen,
  },
  {
    title: "دوراتي",
    url: "/student/my-courses",
    icon: Bookmark,
  },
  {
    title: "الاختبارات",
    url: "/student/quiz",
    icon: ClipboardList,
  },
  {
    title: "الاستطلاع",
    url: "/student/survey",
    icon: PieChart,
  },
  {
    title: "الدراسة",
    url: "/student/study",
    icon: Book,
  },
];
// isTrue ? "اذا تحقق الشرط" : ""
export default function AppSidebar({ userRole }: { userRole: string }) {
  const isTeacher: boolean = userRole === "teacher";
  return (
    <Sidebar side="right" >
      <SidebarHeader>
        <div className="flex justify-start items-center py-4">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>القائمة</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isTeacher
                ? teacherLinks.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon className="mr-2" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
                : studentLinks.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon className="mr-2" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant={"ghost"}
          className="w-full py-2 hover:bg-red-500 hover:text-white rounded-md"
          onClick={() => signOut()}
        >
          <LogOut />
          تسجيل الخروج
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
