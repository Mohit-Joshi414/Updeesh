import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../auth/authentication";

const privateRouters = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />;
};

export default privateRouters;
