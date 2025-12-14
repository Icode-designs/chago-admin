"use client";
import useFetchUser from "@/hooks/userFetchUser";
import { db } from "@/lib/firebaseCl";
import { setRequests } from "@/store/slices/requestSlice";
import { RootState } from "@/store/store";
import { CustomButton, FlexBox } from "@/styles/components/ui.Styles";
import { OrderItem } from "@/types/orderType";
import { RequestType } from "@/types/requestType";
import { AppUser, Vendor } from "@/types/userTypes";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { div } from "framer-motion/client";
import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { GrStatusGoodSmall } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

const SuggestedVendorBox = ({
  id,
  stock,
  item,
  customer,
  orderId,
}: {
  id: string;
  stock: number;
  item: OrderItem;
  customer: AppUser;
  orderId: string;
}) => {
  const { loading: loadingUser, user } = useFetchUser(id);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const request = useSelector((state: RootState) => state.requests.requestList);

  const selectedRequest = request.find(
    (req) => req.requestItem?.id === item?.id && req.orderId === orderId
  );

  if (loadingUser) {
    return <p>loading vendor data</p>;
  }

  const vendor = user as Vendor;

  async function handleRequest() {
    setLoading(true);
    try {
      const requestsRef = collection(db, "requests");

      const newRequest: RequestType = {
        requestTo: vendor.uid,
        orderId: orderId,
        requestItem: item,
        customerName: customer.displayName,
        customerPhone: customer.phoneNumber,
        customerEmail: customer.email,
        customerAddress: customer.address,
        createdAt: Date.now(),
        status: "pending",
      };

      const docRef = await addDoc(requestsRef, newRequest);

      console.log("Request created with ID:", docRef.id);
      dispatch(
        setRequests({
          id: docRef.id,
          ...newRequest,
        })
      );

      setLoading(false);
    } catch (error) {
      console.error("Error creating request:", error);
      setLoading(false);
    }
  }

  return (
    <li>
      <div>
        <p>Store Name</p>
        <h3>{vendor.vendorData.businessname}</h3>
      </div>
      <div>
        <p>vendor stock</p>
        <h3>{stock}</h3>
      </div>
      {selectedRequest && (
        <FlexBox $gap={10} className={`status ${selectedRequest.status}`}>
          <GrStatusGoodSmall className="item-label-icon" />
          <p>Request {selectedRequest.status}</p>
        </FlexBox>
      )}
      {!selectedRequest && (
        <CustomButton onClick={handleRequest} disabled={loading}>
          <p>send{loading && "ing"} request</p>
          <BsSend />
        </CustomButton>
      )}
    </li>
  );
};

export default SuggestedVendorBox;
