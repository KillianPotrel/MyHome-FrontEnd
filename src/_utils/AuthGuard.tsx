import React from "react";
import { Navigate } from "react-router-dom";
import { accountService } from "../services/account.service";

const AuthGuard = ({ children } : any): JSX.Element => {
  if (!accountService.isLogged() || accountService.tokenExpired()) {
    return <Navigate to="/" />;
  }
  return children;
};

export default AuthGuard;
