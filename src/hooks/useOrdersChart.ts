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

function getOrdersPerMonth(orders: Order[], year: number) {
  const months = Array(12).fill(0);

  orders.forEach((order) => {
    const d = new Date(order.createdAt);
    if (d.getFullYear() === year) {
      months[d.getMonth()]++;
    }
  });

  return months.map((count, i) => ({
    label: new Date(0, i).toLocaleString("en-US", { month: "short" }),
    value: count,
  }));
}

function getOrdersPerWeek(orders: Order[], year: number) {
  const weekly: Record<number, number> = {};

  orders.forEach((order) => {
    const d = new Date(order.createdAt);
    if (d.getFullYear() === year) {
      const w = getWeekNumber(d);
      weekly[w] = (weekly[w] || 0) + 1;
    }
  });

  return Object.entries(weekly).map(([week, count]) => ({
    label: `W${week}`,
    value: count,
  }));
}

// --- MAIN HOOK --------------------------------------------------

export function useOrdersChart(
  orders: Order[],
  year: number,
  mode: "month" | "week"
) {
  const years = useMemo(() => getAvailableYears(orders), [orders]);

  const data = useMemo(() => {
    return mode === "month"
      ? getOrdersPerMonth(orders, year)
      : getOrdersPerWeek(orders, year);
  }, [orders, year, mode]);

  return { data, years };
}
