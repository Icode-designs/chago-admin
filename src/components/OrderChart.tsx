"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
} from "recharts";

import { useOrdersChart } from "@/hooks/useOrdersChart";
import { Order } from "@/types/orderType";
import {
  ChartControlBox,
  OrdersChartBox,
  StyledOrdersChart,
  ChartTitle,
} from "@/styles/components/User.styles";

export default function OrdersChart({ orders }: { orders: Order[] }) {
  const [mode, setMode] = useState<"month" | "week">("month"); // "month" | "week"
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

      {/* --- CHART --- */}
      <StyledOrdersChart>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </StyledOrdersChart>
    </OrdersChartBox>
  );
}
