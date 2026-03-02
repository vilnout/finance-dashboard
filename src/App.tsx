import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AddTransactionModal } from "./components/dashboard/AddTransactionalModal";
import MainLayout from "./components/layout/MainLayout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { Budgets } from "./pages/Budgets";
import { DashBoard } from "./pages/DashBoard";
import { Login } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Transactions } from "./pages/Transactions";
import { ROUTES } from "./routes/routes";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a network fetch to show skeletons.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  });

  const router = createBrowserRouter([
    {
      path: ROUTES.LOGIN,
      element: <Login />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Navigate to={ROUTES.DASHBOARD} replace />,
            },
            {
              //requires relative paths, so .slice to remove the initial '/'
              path: ROUTES.DASHBOARD.slice(1),
              element: (
                <DashBoard
                  setIsModalOpen={setIsModalOpen}
                  isLoading={isLoading}
                />
              ),
            },
            {
              path: ROUTES.TRANSACTIONS.slice(1),
              element: (
                <Transactions
                  setIsModalOpen={setIsModalOpen}
                  isLoading={isLoading}
                />
              ),
            },
            {
              path: ROUTES.BUDGETS.slice(1),
              element: <Budgets isLoading={isLoading} />,
            },
          ],
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default App;
