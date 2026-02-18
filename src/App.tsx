import MainLayout from "./components/layout/MainLayout";
import { useFinanceStore } from "./store/useFinanceStore";
import { StatCard } from "./components/dashboard/StatCard";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  PercentCircle,
  Wallet,
} from "lucide-react";
import { TrendChart } from "./components/dashboard/TrendChart";
import { RecentTransactions } from "./components/dashboard/RecentTransactions";
import { useState } from "react";
import { CategoryChart } from "./components/dashboard/CategoryChart";
import { AddTransactionModal } from "./components/dashboard/AddTransactionalModal";

function App() {
  const monthlyStats = useFinanceStore((state) => state.getMonthlyStats);
  const { totalBalance, monthlyExpenses, monthlyIncome, savingsRate } =
    monthlyStats();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-white-500 text-2xl font-bold">Dashboard</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer rounded-lg bg-blue-600 p-3 font-bold text-white transition-colors hover:bg-blue-500"
            >
              Add Transaction
            </button>
          </div>
          <p>Overview of your Financial Health</p>
        </div>
        <div>
          <div className="my-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            <StatCard
              title="Total Balance"
              value={totalBalance}
              icon={Wallet}
              color="text-blue-500"
            />
            <StatCard
              title="Income"
              value={monthlyIncome}
              icon={ArrowUpCircle}
              color="text-emerald-500"
            />
            <StatCard
              title="Expenses"
              value={monthlyExpenses}
              icon={ArrowDownCircle}
              color="text-rose-500"
            />
            <StatCard
              title="Savings Rate"
              value={savingsRate}
              icon={PercentCircle}
              color="text-yellow-500"
              format="percentage"
            />
          </div>
          <TrendChart />
          <div className="grid-col1 grid gap-2 md:grid-cols-2">
            <div className="min-h-20 rounded-lg border-2">
              <RecentTransactions />
            </div>
            <div className="min-h-20 rounded-lg border-2">
              <CategoryChart />
            </div>
          </div>
        </div>
      </MainLayout>
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default App;
