import { setProducts } from "@/store/slices/productsSlice";
import { AppDispatch } from "@/store/store";
import { fetchProducts } from "@/utils/fetchAllProducts";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useFetchProducts() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function fetchAllProducts() {
      setLoading(true);
      try {
        const remoteProducts = await fetchProducts();
        console.log("remote products: " + remoteProducts);
        dispatch(setProducts(remoteProducts));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fetchAllProducts();
  }, [dispatch]);

  return { loading };
}
