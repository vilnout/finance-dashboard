import MainLayout from "./components/layout/MainLayout";
import { useState } from "react";
import { AddTransactionModal } from "./components/dashboard/AddTransactionalModal";
import { DashBoard } from "./pages/DashBoard";
import { type View } from "./components/layout/navConfig";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>("dashboard");
  return (
    <>
      <MainLayout currentView={currentView} onNavigate={setCurrentView}>
        {currentView === "dashboard" ? (
          <DashBoard setIsModalOpen={setIsModalOpen} />
        ) : (
          ""
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
