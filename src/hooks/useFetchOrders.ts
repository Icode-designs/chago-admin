import { fetchOrders } from "@/lib/services/orderService";
import { setOrders } from "@/store/slices/ordersSlice";
import { AppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export default function useFetchOrders() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function userOrders() {
      setLoading(true);
      try {
        const orders = await fetchOrders();
        dispatch(setOrders(orders));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    userOrders();
  }, [dispatch]);

  return { loading };
}
