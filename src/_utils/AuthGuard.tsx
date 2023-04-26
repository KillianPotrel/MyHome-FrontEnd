import React from "react";
import { Navigate } from "react-router-dom";
import { accountService } from "../services/account.service";

const AuthGuard = ({ children } : any): JSX.Element => {
  if (!accountService.isLogged()) {
    return <Navigate to="/" />;
  }
  return children;
};

export default AuthGuard;
