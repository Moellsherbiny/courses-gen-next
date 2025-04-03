"use client";
import { useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
  };
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image || "");
  const [role, setRole] = useState(user.role);
  const [loading, setLoading] = useState(false);

  // Update the profile using the PUT endpoint
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.put(`/users/${user.id}`, { name, image });
      if (res.status === 200) {
        alert("Profile updated successfully!");
      } else {
        alert("Profile update failed!");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  // Update the role to teacher using the PATCH endpoint
  const handleBecomeTeacher = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.patch(`/users/${user.id}`, { role: "teacher" });
      if (res.status === 200) {
        setRole("teacher");
        alert("Congratulations! You are now a teacher.");
      } else {
        alert("Failed to update role.");
      }
    } catch (error) {
      console.error("Role update error:", error);
      alert("Error updating role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src={image || "/default-avatar.png"} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="mt-4 text-xl">الملف الشخصي</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={user.email} disabled />
          </div>
          <div>
            <Label>Role</Label>
            <Input value={role} disabled />
          </div>
          <Button onClick={handleUpdateProfile} disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Profile"}
          </Button>
          {role !== "teacher" && (
            <Button
              variant="secondary"
              onClick={handleBecomeTeacher}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Processing..." : "Become a Teacher"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
