import { useMemo } from "react";
import { Order } from "@/types/orderType";

export function useFulfillmentStatusChart(orders: Order[]) {
  const data = useMemo(() => {
    const statusCounts = { pending: 0, "in transit": 0, recieved: 0 };

    orders.forEach((order) => {
      order.items.forEach((item) => {
        statusCounts[item.status]++;
      });
    });

    return [
      { name: "Pending", value: statusCounts.pending },
      { name: "In Transit", value: statusCounts["in transit"] },
      { name: "Received", value: statusCounts.recieved },
    ];
  }, [orders]);

  return { data };
}
