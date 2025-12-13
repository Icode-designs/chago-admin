import { useMemo } from "react";
import { Order } from "@/types/orderType";

// --- UTILITIES --------------------------------------------------

function getWeekNumber(date: Date) {
  const temp = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = temp.getUTCDay() || 7;
  temp.setUTCDate(temp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Math.ceil((((temp as any) - (yearStart as any)) / 86400000 + 1) / 7);
}

function getAvailableYears(orders: Order[]) {
  const years = new Set(orders.map((o) => new Date(o.createdAt).getFullYear()));
  return Array.from(years).sort();
}

function getCustomerGrowthPerMonth(orders: Order[], year: number) {
  const months: { customers: Set<string> }[] = Array(12)
    .fill(0)
    .map(() => ({ customers: new Set() }));

  orders.forEach((order) => {
    const d = new Date(order.createdAt);
    if (d.getFullYear() === year) {
      months[d.getMonth()].customers.add(order.customerId);
    }
  });

  return months.map((data, i) => ({
    label: new Date(0, i).toLocaleString("en-US", { month: "short" }),
    value: data.customers.size,
  }));
}

function getCustomerGrowthPerWeek(orders: Order[], year: number) {
  const weekly: Record<number, Set<string>> = {};

  orders.forEach((order) => {
    const d = new Date(order.createdAt);
    if (d.getFullYear() === year) {
      const w = getWeekNumber(d);
      if (!weekly[w]) weekly[w] = new Set();
      weekly[w].add(order.customerId);
    }
  });

  return Object.entries(weekly).map(([week, customers]) => ({
    label: `W${week}`,
    value: customers.size,
  }));
}

// --- MAIN HOOK --------------------------------------------------

export function useCustomerGrowthChart(
  orders: Order[],
  year: number,
  mode: "month" | "week"
) {
  const years = useMemo(() => getAvailableYears(orders), [orders]);

  const data = useMemo(() => {
    return mode === "month"
      ? getCustomerGrowthPerMonth(orders, year)
      : getCustomerGrowthPerWeek(orders, year);
  }, [orders, year, mode]);

  return { data, years };
}
