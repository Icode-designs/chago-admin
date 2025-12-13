"use client";
import OrderDisplay from "@/components/OrderDisplay";
import { FlexBox, CustomButton } from "@/styles/components/ui.Styles";
import {
  ItemInfoBox,
  OrderHeader,
  UserContent,
} from "@/styles/components/User.styles";
import { AppUser } from "@/types/userTypes";
import { updateUserDocument } from "@/lib/services/userService";
import { RootState } from "@/store/store";
import React, { use, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatedUser } from "@/store/slices/usersSlice";

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const [loading, setLoading] = useState(false);
  const resolvedParams = use(params);
  const id = resolvedParams.userId;

  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users.usersList);
  const orders = useSelector((state: RootState) => state.orders.ordersList);

  const selectedUser = users.find((user) => user.uid === id);

  // derive user active state
  const isActive =
    selectedUser?.status === "active" ||
    selectedUser?.status === undefined ||
    selectedUser?.status === null;

  // DEBUG: Log every render
  // console.log("=== RENDER ===");
  // console.log("Selected User:", selectedUser);
  // console.log("Status:", selectedUser?.status);
  // console.log("isActive:", isActive);
  // console.log(
  //   "buttonText would be:",
  //   loading
  //     ? isActive
  //       ? "Suspending..."
  //       : "Activating..."
  //     : isActive
  //     ? "Suspend"
  //     : "Activate"
  // );

  async function handleUpdateUserStatus() {
    if (!selectedUser) return;

    setLoading(true);

    try {
      const newStatus =
        selectedUser.status === "suspended" ? "active" : "suspended";

      // console.log("🔄 UPDATING from", selectedUser.status, "to", newStatus);

      const userDoc = await updateUserDocument(selectedUser.uid, {
        status: newStatus,
      });

      // console.log("📦 Received from backend:", userDoc);
      // console.log("📦 Status in received doc:", userDoc?.status);

      // console.log("userDoc.uid:", userDoc?.uid);
      // console.log("selectedUser.uid:", selectedUser.uid);
      // console.log("Are they equal?", userDoc?.uid === selectedUser.uid);

      dispatch(setUpdatedUser(userDoc as AppUser));

      // console.log("✅ Dispatched to Redux");

      // Check Redux state after a brief delay

      // const storeState = users.find((u) => u.uid === id);
      // console.log("🏪 Redux state after dispatch:", storeState?.status);

      alert(`User ${newStatus}`);
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to update user status");
    } finally {
      setLoading(false);
    }
  }
  const buttonText = loading
    ? isActive
      ? "Suspending..."
      : "Activating..."
    : isActive
    ? "Suspend"
    : "Activate";

  const userOrders = orders.filter(
    (order) => order.customerId === selectedUser?.uid
  );

  const selectedUserCreationTime = selectedUser
    ? new Date(Number(selectedUser.createdAt)).toLocaleDateString()
    : "Null";

  return (
    <UserContent>
      <OrderHeader>
        <h2>user details</h2>
      </OrderHeader>

      <ItemInfoBox>
        <FlexBox $justifyContent="space-between" $gap={16} $width="100%">
          <h3>{selectedUser?.displayName || "Null"}</h3>

          <CustomButton
            onClick={handleUpdateUserStatus}
            className={isActive ? "suspend" : ""}
          >
            {buttonText}
          </CustomButton>
        </FlexBox>

        <ul>
          <li>
            <p>User Id</p>
            <h3>{selectedUser?.uid || "Null"}</h3>
          </li>
          <li>
            <p>Email</p>
            <h3>{selectedUser?.email || "Null"}</h3>
          </li>
          <li>
            <p>Telephone</p>
            <h3>{selectedUser?.phoneNumber || "Null"}</h3>
          </li>
          <li>
            <p>Role</p>
            <h3>{selectedUser?.role || "Null"}</h3>
          </li>
          <li>
            <p>Date Joined</p>
            <h3>{selectedUserCreationTime}</h3>
          </li>
          <li>
            <p>Street</p>
            <h3>{selectedUser?.address?.street || "Null"}</h3>
          </li>
          <li>
            <p>State</p>
            <h3>{selectedUser?.address?.state || "Null"}</h3>
          </li>
          <li>
            <p>City</p>
            <h3>{selectedUser?.address?.city || "Null"}</h3>
          </li>
        </ul>
      </ItemInfoBox>

      {selectedUser?.role !== "vendor" &&
        (userOrders.length >= 1 ? (
          userOrders.map((order, i) => <OrderDisplay order={order} key={i} />)
        ) : (
          <p>Dear admin, this customer has not ordered yet.</p>
        ))}
    </UserContent>
  );
};

export default Page;
