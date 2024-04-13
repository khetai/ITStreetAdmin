import { useLocation, Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { MainContext } from "../contexts/mainContextProvider";
import { getCookie } from "../helpers/cookie";
function AdminRoute() {
  const location = useLocation();
  const { role } = useContext(MainContext);
  let auth = { token: role === "SuperAdmin" };
  return auth.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default AdminRoute;
