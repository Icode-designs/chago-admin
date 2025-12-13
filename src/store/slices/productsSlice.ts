import Product from "@/types/productsType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  productsList: Product[];
}

const initialState: ProductState = {
  productsList: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[] | null>) => {
      state.productsList = action.payload || [];
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
