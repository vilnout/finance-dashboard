import MainLayout from "./components/layout/MainLayout";
import { useEffect, useState } from "react";
import { AddTransactionModal } from "./components/dashboard/AddTransactionalModal";
import { DashBoard } from "./pages/DashBoard";
import { TransactionTable } from "./components/transaction/TransactionTable";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ROUTES } from "./routes/routes";
import { NotFoundPage } from "./pages/NotFoundPage";

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
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={ROUTES.DASHBOARD} replace />,
        },
        {
          path: ROUTES.DASHBOARD.slice(1),
          element: (
            <DashBoard setIsModalOpen={setIsModalOpen} isLoading={isLoading} />
          ),
        },
        {
          path: ROUTES.TRANSACTIONS.slice(1),
          element: <TransactionTable setIsModalOpen={setIsModalOpen} />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
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
