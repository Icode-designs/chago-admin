import { Order } from "@/types/orderType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  ordersList: [] as Order[],
};

type UpdateOrderStatusPayload = {
  itemId: string;
  status: "pending" | "in transit" | "recieved";
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[] | []>) => {
      state.ordersList = action.payload ?? [];
    },

    updateOrderStatus: (
      state,
      action: PayloadAction<UpdateOrderStatusPayload>
    ) => {
      const { itemId, status } = action.payload;

      for (const order of state.ordersList) {
        const item = order.items.find((i) => i.id === itemId);
        if (item) {
          item.status = status;
          break;
        }
      }
    },
  },
});

export const { setOrders, updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
