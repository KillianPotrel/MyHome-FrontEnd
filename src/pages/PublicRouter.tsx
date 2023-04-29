import React from "react";
import { Route, Routes } from "react-router-dom";
import Error from "../_utils/Error";
import Home from "./Home";
import Index from "./Index";
import Layout from "./Layout";
import FamilyChoice from "./Family/FamilyChoice";
import FamilyGuard from "../_utils/FamilyGuard";
import FamilyMember from "./FamilyMember";

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/choice" element={<FamilyChoice />} />
      <Route element={<Layout />}>
        <Route index element={<Index />} />
          <Route path="/dashboard" element={<FamilyGuard><Home /></FamilyGuard>} />
          <Route path="/members" element={<FamilyGuard><FamilyMember /></FamilyGuard>} />
        </Route>
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default PublicRouter;
