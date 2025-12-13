"use client";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useOrdersChart } from "@/hooks/useOrdersChart";
import { Order } from "@/types/orderType";
import {
  ChartControlBox,
  OrdersChartBox,
  StyledOrdersChart,
  ChartTitle,
} from "@/styles/components/User.styles";

export default function OrdersCountChart({ orders }: { orders: Order[] }) {
  const [mode, setMode] = useState<"month" | "week">("month");
  const [year, setYear] = useState(new Date().getFullYear());

  const { data, years } = useOrdersChart(orders, year, mode);

  return (
    <OrdersChartBox>
      <ChartTitle>Orders Count</ChartTitle>
      <ChartControlBox>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as "month" | "week")}
        >
          <option value="month">Monthly</option>
          <option value="week">Weekly</option>
        </select>

        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </ChartControlBox>

      <StyledOrdersChart>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />

            <Bar dataKey="value" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </StyledOrdersChart>
    </OrdersChartBox>
  );
}
