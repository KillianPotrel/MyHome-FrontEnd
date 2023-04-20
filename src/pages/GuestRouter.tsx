import React from "react";
import { Route, Routes } from "react-router-dom";
import Error from "../_utils/Error";
import Index from "./Index";
import Login from "./Login";
import Register from "./Register";

const GuestRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default GuestRouter;
