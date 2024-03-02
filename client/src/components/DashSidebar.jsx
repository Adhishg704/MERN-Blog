import React, { useEffect, useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get("tab");

  useEffect(() => {
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className='w-full md:w-56'>
      <SidebarItems>
        <SidebarItemGroup>
          <Link to="/dashboard?tab=profile">
            <SidebarItem active = {tab === "profile"} icon={HiUser} label={"User"} labelColor="dark">
              Profile
            </SidebarItem>
          </Link>
          <SidebarItem icon={HiArrowSmRight} className="cursor-pointer">
            Sign out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
