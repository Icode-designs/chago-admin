// src/hooks/useAuthListener.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseCl";
import { setUser, setLoading } from "../store/slices/userSlice";
import { getUserDocument } from "@/lib/services/userService";
import { AppUser } from "@/types/userTypes";

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // Fetch user document from Firestore
          const userData = await getUserDocument(user.uid);

          dispatch(setUser(userData as AppUser));
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        dispatch(setLoading(false));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};
