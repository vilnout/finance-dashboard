import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { useAuthStore } from "../../store/useAuthStore";

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <Outlet />;
};
