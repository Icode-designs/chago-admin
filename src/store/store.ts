// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import usersReducer from "./slices/usersSlice";
import orderReducer from "./slices/ordersSlice";
import productReducer from "./slices/productsSlice";
import requestReducer from "./slices/requestSlice";

const rootReducer = combineReducers({
  user: userReducer,
  orders: orderReducer,
  users: usersReducer,
  products: productReducer,
  requests: requestReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "orders", "products", "requests"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
