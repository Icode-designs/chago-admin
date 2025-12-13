"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { useRepeatVsNewChart } from "@/hooks/useRepeatVsNewChart";
import { Order } from "@/types/orderType";
import {
  OrdersChartBox,
  StyledOrdersChart,
  ChartTitle,
} from "@/styles/components/User.styles";

const COLORS = ["#6366F1", "#10B981"];

export default function RepeatVsNewCustomersChart({
  orders,
}: {
  orders: Order[];
}) {
  const { data } = useRepeatVsNewChart(orders);

  return (
    <OrdersChartBox>
      <ChartTitle>Repeat vs. New Customers</ChartTitle>
      <StyledOrdersChart>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </StyledOrdersChart>
    </OrdersChartBox>
  );
}
