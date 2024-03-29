import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/Sidebar";
import MyProfile from "../components/dashboard/MyProfile";
import POsts from "../components/dashboard/POsts";
import Users from "../components/dashboard/Users";
import Comments from "../components/dashboard/Comments";
import DashboardCom from "../components/dashboard/DashboardCom";

const Dashboard = () => {
  const location = useLocation();

  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56 ">
        {/* sidebar  */}
        <DashboardSidebar />
      </div>

      {/* outlet  */}

      {tab === "profile" && <MyProfile />}
      {tab === "posts" && <POsts />}
      {tab === "users" && <Users />}
      {tab === "comments" && <Comments />}
      {tab === "dashboard" && <DashboardCom />}



    </div>
  );
};

export default Dashboard;
