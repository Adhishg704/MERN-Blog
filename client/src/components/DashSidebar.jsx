import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiUser, HiArrowSmRight, HiDocumentText } from "react-icons/hi";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get("tab");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async (e) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/signout", {
        method: "POST",
      });
      if (response.ok) {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <SidebarItem
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin? "Admin": "User"}
              labelColor="dark"
            >
              Profile
            </SidebarItem>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <SidebarItem
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </SidebarItem>
            </Link>
          )}
          <SidebarItem
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
