import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get('tab');

  useEffect(() => {
    if(tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row gap-4'>
      <div className="w-full md:w-56">
        <DashSidebar />
      </div>
      <div className='w-full'>
        {tab == "profile" && <DashProfile />}
        {tab == "posts" && <DashPosts />}
      </div>
    </div>
  )
}
