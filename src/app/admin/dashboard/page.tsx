"use client";
import OrdersChart from "@/components/OrderChart";
import SalesOverviewChart from "@/components/SalesOverviewChart";
import OrdersCountChart from "@/components/OrdersCountChart";
import TopProductsChart from "@/components/TopProductsChart";
import CategoryPerformanceChart from "@/components/CategoryPerformanceChart";
import FulfillmentStatusChart from "@/components/FulfillmentStatusChart";
import CustomerGrowthChart from "@/components/CustomerGrowthChart";
import RepeatVsNewCustomersChart from "@/components/RepeatVsNewCustomersChart";
import { RootState } from "@/store/store";
import { OrderHeader, UserContent } from "@/styles/components/User.styles";
import React from "react";
import { useSelector } from "react-redux";
import { FlexBox } from "@/styles/components/ui.Styles";

const Page = () => {
  const orders = useSelector((state: RootState) => state.orders.ordersList);
  return (
    <UserContent>
      <OrderHeader>
        <h2>Dashboard</h2>
      </OrderHeader>
      <OrdersChart orders={orders} />
      <SalesOverviewChart orders={orders} />
      <OrdersCountChart orders={orders} />
      <TopProductsChart orders={orders} />
      <FlexBox $variant="secondary" $width="100%" $gap={24}>
        <CategoryPerformanceChart orders={orders} />
        <FulfillmentStatusChart orders={orders} />
      </FlexBox>

      <CustomerGrowthChart orders={orders} />
      <RepeatVsNewCustomersChart orders={orders} />
    </UserContent>
  );
};

export default Page;
