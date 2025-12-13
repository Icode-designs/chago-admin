"use client";
import useFetchUser from "@/hooks/userFetchUser";
import { RootState } from "@/store/store";
import { CustomButton } from "@/styles/components/ui.Styles";
import { Vendor } from "@/types/userTypes";
import React from "react";
import { BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";

const SuggestedVendorBox = ({ id, stock }: { id: string; stock: number }) => {
  const { loading, user } = useFetchUser(id);

  if (loading) {
    return <p>loading vendor data</p>;
  }

  const vendor = user as Vendor;

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
      <CustomButton>
        <p>send request</p>
        <BsSend />
      </CustomButton>
    </li>
  );
};

export default SuggestedVendorBox;
