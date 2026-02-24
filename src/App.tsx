import MainLayout from "./components/layout/MainLayout";
import { useEffect, useState } from "react";
import { AddTransactionModal } from "./components/dashboard/AddTransactionalModal";
import { DashBoard } from "./pages/DashBoard";
import { type View } from "./components/layout/navConfig";
import { TransactionTable } from "./components/transaction/TransactionTable";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a network fetch to show skeletons.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  });
  return (
    <>
      <MainLayout currentView={currentView} onNavigate={setCurrentView}>
        {currentView === "dashboard" ? (
          <DashBoard
            setIsModalOpen={setIsModalOpen}
            onNavigate={setCurrentView}
            isLoading={isLoading}
          />
        ) : (
          <TransactionTable setIsModalOpen={setIsModalOpen} />
        )}
      </MainLayout>
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default App;
