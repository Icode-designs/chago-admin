import { getUserDocument } from "@/lib/services/userService";
import { AppUser } from "@/types/userTypes";
import { useEffect, useState } from "react";

export default function useFetchUser(uid: string) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true); // start as loading
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;

    let active = true; // prevents state updates on unmounted component

    async function fetchUser() {
      try {
        const userDoc = await getUserDocument(uid);
        if (active) setUser(userDoc);
      } catch (err: unknown) {
        if (active && err instanceof Error) {
          setError(err.message);
        } else {
          console.log(err);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchUser();

    return () => {
      active = false;
    };
  }, [uid]);

  return { loading, user, error };
}
