import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Error from "../_utils/Error";
import Home from "./Home";
import Index from "./Index";
import Layout from "./Layout";
import FamilyChoice from "./Family/FamilyChoice";
import FamilyCreate from "./Family/FamilyCreate";
import FamilyGuard from "../_utils/FamilyGuard";

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/choice" element={<FamilyChoice />} />
      <Route path="/create" element={<FamilyCreate />} />
      
      <Route element={<FamilyGuard />}>
        <Route element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/dashboard" element={<Home />} />
        </Route>
      </Route>
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default PublicRouter;
