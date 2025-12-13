import { useMemo } from "react";
import { Order } from "@/types/orderType";

export function useCategoryPerformanceChart(orders: Order[]) {
  const data = useMemo(() => {
    const categorySales: Record<string, number> = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const total = item.price * item.quantity;
        categorySales[item.category || "Unknown"] =
          (categorySales[item.category || "Unknown"] || 0) + total;
      });
    });

    return Object.entries(categorySales).map(([name, value]) => ({
      name,
      value,
    }));
  }, [orders]);

  return { data };
}
