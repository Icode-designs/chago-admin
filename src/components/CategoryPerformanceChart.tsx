"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { useCategoryPerformanceChart } from "@/hooks/useCategoryPerformanceChart";
import { Order } from "@/types/orderType";
import {
  OrdersChartBox,
  StyledOrdersChart,
  ChartTitle,
} from "@/styles/components/User.styles";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function CategoryPerformanceChart({
  orders,
}: {
  orders: Order[];
}) {
  const { data } = useCategoryPerformanceChart(orders);

  return (
    <OrdersChartBox>
      <ChartTitle>Category Performance</ChartTitle>
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
