import HomePage from "@/components/home";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { getUserData } from "@/lib/getUserRole";
export default async function Home() {
  const session = await getServerSession();
  // const userRole = getUserData(session?.user?.role);

  console.log(session?.user);

  // const date = new Date();
  // const amOrpm = date.getHours() >= 12 ? "مساء الخير يا" : "صباح الخير يا";
  if (session?.user)
    redirect("/dashboard");

  return <HomePage />;
}
