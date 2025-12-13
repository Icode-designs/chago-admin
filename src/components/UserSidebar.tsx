"use client";
import { FaPowerOff } from "react-icons/fa6";
import useMediaQuery from "@/hooks/useMedia";
import { NAV_CONTEXT } from "@/providers/NavProvider";
import { FlexBox } from "@/styles/components/ui.Styles";
import { NavigationBox, StyledSideBar } from "@/styles/components/User.styles";
import React, { useContext, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { handleLogoutAction } from "@/app/admin/actions";
import { logoutUser } from "@/utils/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NavLink from "./UserNavlink";
import { RootState } from "@/store/store";

const UserSidebar = () => {
  const router = useRouter();
  const navCtx = useContext(NAV_CONTEXT);
  const isLargeScreen = useMediaQuery(1200);
  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (!navCtx) return;
    if (isLargeScreen) {
      navCtx.openNav();
    }
  }, [navCtx, isLargeScreen]);

  if (!navCtx) return null;

  const { toggleNav, navOpen } = navCtx;

  async function handleLogout() {
    try {
      // Delete session cookie on server
      await handleLogoutAction();

      // Log out from Firebase
      await logoutUser();

      // Redirect to home
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <StyledSideBar $navOpen={navOpen}>
      <button onClick={toggleNav}>
        {navOpen ? <FaAngleRight /> : <FaAngleLeft />}
      </button>
      <div>
        <h3>Welcone Admin {user?.firstName}</h3>
      </div>

      <NavigationBox $show={navOpen}>
        <NavLink href="/admin/dashboard">Dashboard</NavLink>
        <NavLink href="/admin/edit-profile">Edit Profile</NavLink>
        <NavLink href={`/admin/orders`}>Manage Orders</NavLink>
        <NavLink href={`/admin/users`}>Manage Users</NavLink>
      </NavigationBox>
      <button onClick={handleLogout}>
        <FlexBox $gap={8}>
          <FaPowerOff />
          <p>Logout</p>
        </FlexBox>
      </button>
    </StyledSideBar>
  );
};

export default UserSidebar;
