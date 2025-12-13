import { fetchUsers } from "@/lib/services/usersService";
import { setUsers } from "@/store/slices/usersSlice";
import { AppDispatch, RootState } from "@/store/store";
import { AppUser } from "@/types/userTypes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useFetchUsers() {
  const [loading, setLoading] = useState(false);
  const userList = useSelector((state: RootState) => state.users.usersList);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Only fetch if we don't have users yet
    if (userList.length > 0) return;

    async function getUsersList() {
      setLoading(true);
      try {
        const users = await fetchUsers();
        dispatch(setUsers(users as AppUser[]));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    getUsersList();
  }, [dispatch, userList.length]);

  return { loading };
}
