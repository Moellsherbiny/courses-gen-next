import DashboardNavbar from "@/components/DashboardNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/appSidebar";
import { getUserData } from "@/lib/getUserData";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserData();

  if (!user || "error" in user) {
    redirect("/"); // Redirect if no user is found
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar userRole={user.role} />
      <main className="flex-1 w-full">
        <DashboardNavbar userData={user} />
        <section className="p-4 min-h-[calc(100vh-72px)] items-center">
          {children}
        </section>
      </main>
    </SidebarProvider>
  );
}
