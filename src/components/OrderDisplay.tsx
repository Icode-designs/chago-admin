import React from "react";

import { UserOrderList } from "@/styles/components/User.styles";
import { Order } from "@/types/orderType";
import { GridColumn } from "@/styles/components/ui.Styles";
import OrderItemCard from "./OrderItemCard";
import Link from "next/link";

interface Props {
  order: Order;
}

const OrderDisplay = ({ order }: Props) => {
  const orderCreationTime = new Date(order.createdAt).toLocaleDateString();

  return (
    <UserOrderList>
      <GridColumn>
        <h3>Order ref: {order.orderId} </h3>
        <p>created on: {orderCreationTime}</p>
      </GridColumn>

      {order.items.map((item, i) => (
        <Link href={`/admin/orders/${item.id}`} key={i}>
          <OrderItemCard item={item} />
        </Link>
      ))}
    </UserOrderList>
  );
};

export default OrderDisplay;
