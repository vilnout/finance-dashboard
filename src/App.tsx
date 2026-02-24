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
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: "dashboard",
          element: (
            <DashBoard setIsModalOpen={setIsModalOpen} isLoading={isLoading} />
          ),
        },
        {
          path: "transactions",
          element: <TransactionTable setIsModalOpen={setIsModalOpen} />,
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
