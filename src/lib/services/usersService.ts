// lib/services/productService.ts
import { db } from "@/lib/firebaseCl";
import { AppUser } from "@/types/userTypes";
import { cleanData } from "@/utils/fetchAllProducts";
import { collection, getDocs } from "firebase/firestore";

// Fetch orders from firestore
export async function fetchUsers(): Promise<AppUser[]> {
  try {
    const usersRef = collection(db, "users");

    const snapshot = await getDocs(usersRef);

    const users = snapshot.docs.map((doc) => {
      const rawData = doc.data();

      return {
        uid: doc.id,
        ...cleanData(rawData),
      } as AppUser;
    });

    console.log("users list: " + users);
    return users;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}
