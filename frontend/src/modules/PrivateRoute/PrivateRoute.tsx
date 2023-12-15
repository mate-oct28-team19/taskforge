import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { TokenContext } from "../../contexts/TokenContext";

export const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { token } = useContext(TokenContext);
  const location = useLocation();

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}