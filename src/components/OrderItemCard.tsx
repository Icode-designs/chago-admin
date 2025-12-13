import { StyledOrderCard } from "@/styles/components/User.styles";
import { OrderItem } from "@/types/orderType";
import formatToNaira from "@/utils/formatPrice";
import { trimText } from "@/utils/trimText";

import React from "react";
import { GoDotFill } from "react-icons/go";

interface Props {
  item: OrderItem;
}

const OrderItemCard = ({ item }: Props) => {
  const statusClassMap: Record<string, string> = {
    pending: "pending",
    recieved: "recieved",
    cancelled: "cancelled",
    "in transit": "transit",
  };
  return (
    <StyledOrderCard>
      <h3>{trimText(item.id as string, 10)}</h3>
      <p>{trimText(item.title as string, 10)}</p>

      <p>{formatToNaira(Number(item.price))}</p>
      <p>X{item.quantity}</p>
      <div className={`status ${statusClassMap[item.status] || "unknown"}`}>
        <GoDotFill />
        <p>{item.status}</p>
      </div>
    </StyledOrderCard>
  );
};

export default OrderItemCard;
