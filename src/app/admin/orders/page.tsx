"use client";
import OrderDisplay from "@/components/OrderDisplay";
import { RootState } from "@/store/store";
import { UserContent } from "@/styles/components/User.styles";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const orders = useSelector((state: RootState) => state.orders.ordersList);
  return (
    <UserContent>
      {orders
        .slice()
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((order, i) => (
          <OrderDisplay order={order} key={i} />
        ))}
    </UserContent>
  );
};

export default Page;
