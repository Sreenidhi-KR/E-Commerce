import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth_context";
import { useEffect } from "react";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      auth.setUser(user);
    }
  }, []);

  if (!user) {
    return <Navigate to="/user-login" state={{ path: location.pathname }} />;
  }
  if (user.isSeller) {
    return <Navigate to="/seller-home" />;
  }
  return (
    <div>
      {children}
      <Outlet />
    </div>
  );
};
