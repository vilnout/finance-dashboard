import {
  ArrowDownCircle,
  ArrowUpCircle,
  PercentCircle,
  Wallet,
} from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryChart } from "../components/dashboard/CategoryChart";
import { DashboardSkeleton } from "../components/dashboard/DashboardSkeleton";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { StatCard } from "../components/dashboard/StatCard";
import { TrendChart } from "../components/dashboard/TrendChart";
import { AddTransactionButton } from "../components/ui/AddTransactionButton";
import { WithSkeleton } from "../components/ui/WithSkeleton";
import { useFinanceStore } from "../store/useFinanceStore";
import { getMonthlyStats } from "../utils/monthlyStats";
import { aggregrateTransactions } from "../utils/transactions";

type DashBoardProps = {
  setIsModalOpen: (value: boolean) => void;
  isLoading: boolean;
};

export const DashBoard = ({ setIsModalOpen, isLoading }: DashBoardProps) => {
  const transactions = useFinanceStore((state) => state.transactions);
  const currency = useFinanceStore((state) => state.currency);
  const data = aggregrateTransactions(transactions);
  const navigate = useNavigate();
  const { totalBalance, monthlyExpenses, monthlyIncome, savingsRate } =
    useMemo(() => {
      return getMonthlyStats(transactions);
    }, [transactions]);

  return (
    <WithSkeleton isLoading={isLoading} skeleton={<DashboardSkeleton />}>
      <>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-white-500 text-2xl font-bold">Dashboard</h2>
            <AddTransactionButton onClick={() => setIsModalOpen(true)} />
          </div>
          <p>Overview of your Financial Health</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="my-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Balance"
              value={totalBalance}
              currency={currency}
              icon={Wallet}
              color="text-blue-500"
            />
            <StatCard
              title="Income"
              value={monthlyIncome}
              currency={currency}
              icon={ArrowUpCircle}
              color="text-emerald-500"
              onClick={() => navigate("/transactions?type=Income")}
            />
            <StatCard
              title="Expenses"
              value={monthlyExpenses}
              currency={currency}
              icon={ArrowDownCircle}
              color="text-rose-500"
              onClick={() => navigate("/transactions?type=Expense")}
            />
            <StatCard
              title="Savings Rate"
              value={savingsRate}
              currency={currency}
              icon={PercentCircle}
              color="text-yellow-500"
              format="percentage"
            />
          </div>
          <TrendChart data={data} currency={currency} />
          <div className="grid-col1 grid gap-4 md:gap-2 lg:grid-cols-2">
            <div className="min-h-20 rounded-lg border border-slate-800">
              <RecentTransactions
                transactions={transactions}
                currency={currency}
              />
            </div>
            <div className="min-h-20 rounded-lg border border-slate-800">
              <CategoryChart transactions={transactions} currency={currency} />
            </div>
          </div>
        </div>
      </>
    </WithSkeleton>
  );
};
