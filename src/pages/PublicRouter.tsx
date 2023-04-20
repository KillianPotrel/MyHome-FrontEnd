import React from "react";
import { Route, Routes } from "react-router-dom";
import Error from "../_utils/Error";
import Home from "./Home";
import Index from "./Index";
import Layout from "./Layout";

const PublicRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;
