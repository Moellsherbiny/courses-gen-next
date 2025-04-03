import DashboardNavbar from "@/components/DashboardNav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: "teacher" | "student";
}

export default function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} />
      <main>
        <SidebarTrigger />
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
