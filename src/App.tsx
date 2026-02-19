import MainLayout from "./components/layout/MainLayout";
import { useState } from "react";
import { AddTransactionModal } from "./components/dashboard/AddTransactionalModal";
import { DashBoard } from "./pages/DashBoard";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <MainLayout>
        <DashBoard setIsModalOpen={setIsModalOpen} />
      </MainLayout>
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default App;
