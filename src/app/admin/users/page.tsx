"use client";
import { RootState } from "@/store/store";
import { CustomLink, FlexBox } from "@/styles/components/ui.Styles";
import {
  UserContent,
  UserDisplayCard,
  UserlistHeader,
} from "@/styles/components/User.styles";

import React, { useState } from "react";
import { useSelector } from "react-redux";

const Users = () => {
  const [filters, setFilters] = useState({
    byVendor: false,
    byCustomer: false,
  });

  const [searchParams, setSearchParams] = useState("");

  const users = useSelector((state: RootState) => state.users.usersList);
  const clientUsers = users.filter((user) => user.role !== "admin");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(e.target.value);
  }

  function toggleFilterByVendor() {
    setFilters((prev) => ({ ...prev, byVendor: !prev.byVendor }));
  }

  function toggleFilterByCustomer() {
    setFilters((prev) => ({ ...prev, byCustomer: !prev.byCustomer }));
  }

  /**
   * Filtering logic:
   * - First apply role-based filters (vendor/customer) if any are active.
   * - Then apply search (name, uid, or vendor business name if vendor).
   * - If no filters and no search, show all clientUsers.
   */
  const displayedUsers = clientUsers.filter((user) => {
    // 1) Role filters
    const isVendor = user.role === "vendor";
    const isCustomer = user.role === "customer";

    // If either filter is active, require the user to match at least one active filter.
    if (filters.byVendor || filters.byCustomer) {
      const passesVendorFilter = filters.byVendor && isVendor;
      const passesCustomerFilter = filters.byCustomer && isCustomer;
      if (!(passesVendorFilter || passesCustomerFilter)) {
        return false;
      }
    }

    // 2) Search filter (if provided)
    if (!searchParams) return true;

    const q = searchParams.toLowerCase();

    const matchesName =
      user.firstName?.toLowerCase().includes(q) ||
      user.lastName?.toLowerCase().includes(q) ||
      user.displayName?.toLowerCase().includes(q);

    const matchesUid = user.uid?.toLowerCase().includes(q);

    const matchesBusinessName =
      isVendor &&
      (user.vendorData?.businessname ?? "")
        .toString()
        .toLowerCase()
        .includes(q);

    return Boolean(matchesName || matchesUid || matchesBusinessName);
  });

  return (
    <UserContent>
      <UserlistHeader
        $displayingVendors={filters.byVendor}
        $displayingCustomers={filters.byCustomer}
      >
        <h2>manage users</h2>

        <div>
          <input
            type="text"
            placeholder="search users by name, id or business name"
            value={searchParams}
            onChange={handleChange}
          />

          <FlexBox $gap={10}>
            <p>Tabs:</p>
            <button onClick={toggleFilterByVendor}>Vendors</button>|
            <button onClick={toggleFilterByCustomer}>Customers</button>
          </FlexBox>
        </div>
      </UserlistHeader>

      {displayedUsers.map((user, i) => (
        <UserDisplayCard key={i}>
          <div>
            <p>Full Name</p>
            <h3>{user.displayName}</h3>
          </div>

          <div>
            <p>Email</p>
            <h3>{user.email}</h3>
          </div>

          <div>
            <p>Role</p>
            <h3>{user.role}</h3>
          </div>

          <CustomLink href={`/admin/users/${user.uid}`}>
            View details
          </CustomLink>
        </UserDisplayCard>
      ))}
    </UserContent>
  );
};

export default Users;
