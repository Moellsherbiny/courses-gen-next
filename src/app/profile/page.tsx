import { getUserData } from "@/lib/getUserData";
import ProfileForm from "@/components/ProfileForm";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUserData();
  if (!user || "error" in user)
    redirect("/")

  return (

    <div className="flex items-center justify-center min-h-screen p-6">
      <ProfileForm user={user} />
    </div>

  );
}
