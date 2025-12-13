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

import { useFulfillmentStatusChart } from "@/hooks/useFulfillmentStatusChart";
import { Order } from "@/types/orderType";
import {
  OrdersChartBox,
  StyledOrdersChart,
  ChartTitle,
} from "@/styles/components/User.styles";

export default function FulfillmentStatusChart({
  orders,
}: {
  orders: Order[];
}) {
  const { data } = useFulfillmentStatusChart(orders);

  return (
    <OrdersChartBox>
      <ChartTitle>Fulfillment Status</ChartTitle>
      <StyledOrdersChart>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="value" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </StyledOrdersChart>
    </OrdersChartBox>
  );
}
