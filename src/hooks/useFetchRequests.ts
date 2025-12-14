import { fetchRequests } from "@/lib/services/requestServices";
import { setRequests } from "@/store/slices/requestSlice";
import { AppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export default function useFetchRequests() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function userRequests() {
      setLoading(true);
      try {
        const requests = await fetchRequests();
        dispatch(setRequests(requests));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    userRequests();
  }, [dispatch]);

  return { loading };
}
