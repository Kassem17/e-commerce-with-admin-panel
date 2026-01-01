import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input
        type="checkbox"
        id="my-drawer"
        className="drawer-toggle"
        defaultChecked
      />
      <div className="drawer-content">
        <NavBar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
