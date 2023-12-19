import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  return (
    isAuthenticated === true ?
      <Outlet />
      :
      <Navigate to="/login" state={{ from: location }} replace />
  );
}