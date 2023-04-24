import React from "react";
import { Navigate } from "react-router-dom";
import { accountService } from "../services/account.service";

const AuthGuard = ({ children } : any) => {
  // use Query current user si httpOnly
  // si ok connect
  // sinon navigate
  //          /viewer

  if (!accountService.isLogged()) {
    return <Navigate to="/" />;
  }
  return children;
};

export default AuthGuard;
