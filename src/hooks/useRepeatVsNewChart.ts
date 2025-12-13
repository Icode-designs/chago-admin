import { useMemo } from "react";
import { Order } from "@/types/orderType";

export function useRepeatVsNewChart(orders: Order[]) {
  const data = useMemo(() => {
    const customerOrderCount: Record<string, number> = {};

    orders.forEach((order) => {
      customerOrderCount[order.customerId] =
        (customerOrderCount[order.customerId] || 0) + 1;
    });

    let newCustomers = 0;
    let repeatCustomers = 0;

    Object.values(customerOrderCount).forEach((count) => {
      if (count === 1) newCustomers++;
      else if (count > 1) repeatCustomers++;
    });

    return [
      { name: "New Customers", value: newCustomers },
      { name: "Repeat Customers", value: repeatCustomers },
    ];
  }, [orders]);

  return { data };
}
