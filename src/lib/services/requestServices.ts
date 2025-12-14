// lib/services/productService.ts
import { db } from "@/lib/firebaseCl";
import { RequestType } from "@/types/requestType";
import { cleanData } from "@/utils/fetchAllProducts";
import { collection, getDocs } from "firebase/firestore";

// Fetch orders from firestore
export async function fetchRequests(): Promise<RequestType[]> {
  try {
    const requestRef = collection(db, "requests");

    const snapshot = await getDocs(requestRef);

    const requests = snapshot.docs.map((doc) => {
      const rawData = doc.data();

      return {
        orderId: doc.id,
        ...cleanData(rawData),
      } as RequestType;
    });

    console.log("user orders: " + requests);
    return requests;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}
