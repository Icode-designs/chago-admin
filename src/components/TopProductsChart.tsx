"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useTopProductsChart } from "@/hooks/useTopProductsChart";
import { Order } from "@/types/orderType";
import {
  OrdersChartBox,
  StyledOrdersChart,
  ChartTitle,
} from "@/styles/components/User.styles";

export default function TopProductsChart({ orders }: { orders: Order[] }) {
  const { data } = useTopProductsChart(orders);

  return (
    <OrdersChartBox>
      <ChartTitle>Top 5 Products</ChartTitle>
      <StyledOrdersChart>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            layout="horizontal"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="value" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </StyledOrdersChart>
    </OrdersChartBox>
  );
}
