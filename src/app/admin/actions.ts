"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function handleLogoutAction() {
  try {
    // Delete the session cookie
    const cookieStore = await cookies();
    cookieStore.delete("session");

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Logout failed" };
  }
}

export async function redirectToHome() {
  redirect("/");
}
