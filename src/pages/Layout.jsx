import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.tsx";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
