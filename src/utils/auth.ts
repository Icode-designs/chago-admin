// src/firebase/authService.ts
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseCl";

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};
