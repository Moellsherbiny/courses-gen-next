import DashboardLayout from "@/components/Dashboard"


function layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}

export default layout