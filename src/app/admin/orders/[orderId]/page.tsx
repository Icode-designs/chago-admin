"use client";
import SuggestedVendorBox from "@/components/SuggestedVendorBox";
import useMediaQuery from "@/hooks/useMedia";
import useFetchUser from "@/hooks/userFetchUser";
import { RootState } from "@/store/store";
import { FlexBox, LoaderBox } from "@/styles/components/ui.Styles";
import {
  ItemInfoBox,
  OrderHeader,
  UserContent,
  VendorSuggestionBox,
} from "@/styles/components/User.styles";
import { OrderItem } from "@/types/orderType";
import { AppUser } from "@/types/userTypes";
import formatToNaira from "@/utils/formatPrice";
import { groupStockByVendor } from "@/utils/vendorStock";
import React, { use } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoPricetagsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Page = ({ params }: { params: Promise<{ orderId: string }> }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.orderId;
  const orders = useSelector((state: RootState) => state.orders.ordersList);
  const products = useSelector(
    (state: RootState) => state.products.productsList
  );

  const order = orders.find((order) =>
    order.items.some((item) => item.id === id)
  );

  const item = order?.items.find((itm) => itm.id === id);

  const isLargeScreen = useMediaQuery(1024);

  // only fetch when customerId exists
  const customerId = order?.customerId;
  const { loading, user: customer } = useFetchUser(customerId || "");

  const name = item?.title?.toLowerCase() ?? "";

  const similarProducts = products.filter((prod) => {
    if (!item) return false;

    const titleMatch = prod.title.toLowerCase().includes(name);
    const categoryMatch = prod.category === item.category;

    return titleMatch || categoryMatch;
  });

  const sellers = Array.from(
    new Set(similarProducts.map((item) => item.sellerId))
  );

  const generalStock = groupStockByVendor(similarProducts);

  if (loading)
    return (
      <LoaderBox>
        <div></div>
      </LoaderBox>
    );

  return (
    <UserContent>
      <OrderHeader>
        <div>
          <h2>{isLargeScreen && "Order"} Item Details</h2>
        </div>
      </OrderHeader>
      <ItemInfoBox>
        <div>
          <p>Customer Information</p>
        </div>

        <ul>
          <li>
            <p>First name</p>
            <h3>{customer?.firstName}</h3>
          </li>
          <li>
            <p>Last name</p>
            <h3>{customer?.lastName}</h3>
          </li>
          <li>
            <p>Email</p>
            <h3>{customer?.email}</h3>
          </li>
          <li>
            <p>Tel</p>
            <h3>{customer?.phoneNumber}</h3>
          </li>
          <li>
            <p>Street</p>
            <h3>{customer?.address?.street}</h3>
          </li>
          <li>
            <p>City</p>
            <h3>{customer?.address?.city}</h3>
          </li>
          <li>
            <p>State</p>
            <h3>{customer?.address?.state}</h3>
          </li>
        </ul>
      </ItemInfoBox>
      <ItemInfoBox>
        <div>
          <p>Item Information</p>
        </div>
        <ul>
          <li>
            <p>Order Item Id</p>
            <h3>#{item?.id}</h3>
          </li>
          <li>
            <p>Vendor Id</p>
            <h3>#{item?.vendorId}</h3>
          </li>
          <li>
            <p>Title</p>
            <h3>{item?.title}</h3>
          </li>
          <li>
            <FlexBox $gap={10}>
              <IoPricetagsOutline className="item-label-icon" />
              <div>
                <p>Price</p>
                <h3>{formatToNaira(Number(item?.price))}</h3>
              </div>
            </FlexBox>
          </li>
          <li>
            <FlexBox $gap={10}>
              <FaBoxOpen className="item-label-icon" />
              <div>
                <p>Quantity</p>
                <h3>X {item?.quantity}</h3>
              </div>
            </FlexBox>
          </li>
          <li>
            <FlexBox
              $gap={10}
              $width="fit-content"
              className={`status ${item?.status}`}
            >
              <GrStatusGoodSmall className="item-label-icon" />
              <div>
                <h3>{item?.status}</h3>
              </div>
            </FlexBox>
          </li>
        </ul>
      </ItemInfoBox>
      <VendorSuggestionBox>
        <h3>Suggested Vendors</h3>
        <ul>
          {sellers.length >= 1 &&
            sellers.map((seller, i) => (
              <SuggestedVendorBox
                id={seller as string}
                customer={customer as AppUser}
                item={item as OrderItem}
                key={i}
                orderId={order?.orderId as string}
                stock={generalStock[seller]}
              />
            ))}
          {sellers.length <= 0 && (
            <p>{`couldn't`} find any vendor for this product</p>
          )}
        </ul>
      </VendorSuggestionBox>
    </UserContent>
  );
};

export default Page;
