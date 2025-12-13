"use client";
import { ReactNode } from "react";
import UserSidebar from "./UserSidebar";
import { NavContextProvider } from "@/providers/NavProvider";
import { UserContainer } from "@/styles/components/User.styles";
import useFetchOrders from "@/hooks/useFetchOrders";
import useFetchUsers from "@/hooks/useFetchUsers";
import { LoaderBox } from "@/styles/components/ui.Styles";
import useFetchProducts from "@/hooks/useFetcProducts";

export default function UserLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { loading: loadingOrders } = useFetchOrders();
  const { loading: loadingUsers } = useFetchUsers();
  const { loading: loadingProducts } = useFetchProducts();

  if (loadingOrders || loadingUsers || loadingProducts) {
    return (
      <LoaderBox>
        <div></div>
      </LoaderBox>
    );
  }

  return (
    <UserContainer>
      <NavContextProvider>
        <UserSidebar />
        {children}
      </NavContextProvider>
    </UserContainer>
  );
}
