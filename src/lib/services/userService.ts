// src/firebase/userService.ts
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseCl";
import { Admin, AppUser, Customer, Vendor } from "@/types/userTypes";
import { cleanData } from "@/utils/fetchAllProducts";

// Get user document from Firestore
export const getUserDocument = async (uid: string): Promise<AppUser | null> => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        uid: data.uid,
        ...data,
      } as Admin | Vendor | Customer;
    }

    return null;
  } catch (error) {
    console.error("Error getting user document:", error);
    throw error;
  }
};

// UPDATE DOCUMENT — CLEAN BEFORE RETURNING
export const updateUserDocument = async (
  uid: string,
  updates: Partial<Admin | null>
) => {
  try {
    const userRef = doc(db, "users", uid);

    // ensures updates is always an object
    const safeUpdates = updates ?? {};

    // detect pure status update
    const isStatusOnlyUpdate =
      Object.keys(safeUpdates).length === 1 &&
      Object.prototype.hasOwnProperty.call(safeUpdates, "status");

    // Only add updatedAt if not a status-only update
    const updatePayload = isStatusOnlyUpdate
      ? safeUpdates
      : { ...safeUpdates, updatedAt: serverTimestamp() };

    await updateDoc(userRef, updatePayload);

    // fetch updated doc
    const rawDoc = await getUserDocument(uid);

    // 🔥 CLEAN THE DATA HERE BEFORE RETURNING TO REDUX
    const cleanedDoc = cleanData(rawDoc);

    return cleanedDoc;
  } catch (error) {
    console.error("Error updating user document:", error);
    throw error;
  }
};

// Check if user document exists
export const userDocumentExists = async (uid: string): Promise<boolean> => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists();
  } catch (error) {
    console.error("Error checking user document:", error);
    return false;
  }
};
