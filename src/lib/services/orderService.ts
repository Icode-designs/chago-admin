// lib/services/productService.ts
import { db } from "@/lib/firebaseCl";
import { Order } from "@/types/orderType";
import { cleanData } from "@/utils/fetchAllProducts";
import { collection, getDocs } from "firebase/firestore";

// Fetch orders from firestore
export async function fetchOrders(): Promise<Order[]> {
  try {
    const orderRef = collection(db, "orders");

    const snapshot = await getDocs(orderRef);

    const orders = snapshot.docs.map((doc) => {
      const rawData = doc.data();

      return {
        orderId: doc.id,
        ...cleanData(rawData),
      } as Order;
    });

    console.log("user orders: " + orders);
    return orders;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}
