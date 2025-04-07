import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function login(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    console.log(user);
    if (!user) return null;

    if (!user.password) return null; // No password set
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string
    );
    if (!isPasswordValid) return null;

    return user;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}
