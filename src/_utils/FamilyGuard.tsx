import React from "react";
import { Navigate } from "react-router-dom";
import { accountService } from "../services/account.service";

const FamilyGuard = ({ children } : any): JSX.Element => {
  
    if (accountService.isLogged() && !accountService.isFamilyConnect()) {
        return <Navigate to="/family/choice" />;
    }
    return children;
};

export default FamilyGuard;
