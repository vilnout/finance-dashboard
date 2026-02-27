import MainLayout from "./components/layout/MainLayout";
import { useEffect, useState } from "react";
import { AddTransactionModal } from "./components/dashboard/AddTransactionalModal";
import { DashBoard } from "./pages/DashBoard";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ROUTES } from "./routes/routes";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Budgets } from "./pages/Budgets";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { Transactions } from "./pages/Transactions";

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
              element: <Transactions setIsModalOpen={setIsModalOpen} />,
            },
            {
              path: ROUTES.BUDGETS.slice(1),
              element: <Budgets />,
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
