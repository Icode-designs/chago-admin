import { useMemo } from "react";
import { Order } from "@/types/orderType";
import { trimText } from "@/utils/trimText";

export function useTopProductsChart(orders: Order[]) {
  const data = useMemo(() => {
    const productCounts: Record<string, number> = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        productCounts[item.title] =
          (productCounts[item.title] || 0) + item.quantity;
      });
    });

    return Object.entries(productCounts)
      .map(([name, value]) => ({ name: trimText(name, 20), value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // top 10
  }, [orders]);

  return { data };
}
