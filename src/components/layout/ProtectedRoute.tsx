import { ROUTES } from "../../routes/routes";
import { useAuthStore } from "../../store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <Outlet />;
};
