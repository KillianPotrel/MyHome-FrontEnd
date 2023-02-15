import React from "react";
import { Route, Routes } from "react-router-dom";
// import Error from "../_utils/Error";
// import Contact from "./Contact";
// import Home from "./Home";
// import Layout from "./Layout";
import { Layout, Home, Error, Contact } from "../pages";

const PublicRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;
