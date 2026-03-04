import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TransactionSkeleton } from "../components/transaction/TransactionSkeleton";
import { TransactionTable } from "../components/transaction/TransactionTable";
import { WithSkeleton } from "../components/ui/WithSkeleton";
import { useFinanceStore } from "../store/useFinanceStore";
import { useToastStore } from "../store/useToastStore";
import { filterTransactions } from "../utils/transactions";

type TransactionsProps = {
  setIsModalOpen: (value: boolean) => void;
  isLoading: boolean;
};

export const Transactions = ({
  setIsModalOpen,
  isLoading,
}: TransactionsProps) => {
  const transactions = useFinanceStore((state) => state.transactions);
  const removeTransaction = useFinanceStore((state) => state.removeTransaction);
  const [searchParams, setSearchParams] = useSearchParams();
  const currency = useFinanceStore((state) => state.currency);
  const addToast = useToastStore((state) => state.addToast);

  // Reading url
  const typeFilter = searchParams.get("type") || "All";
  const categoryFilter = searchParams.get("category") || "All Categories";
  const urlMonth = searchParams.get("month");
  const urlYear = searchParams.get("year");
  const [searchTerm, setSearchTerm] = useState("");

  // Handlers
  const handleTypeChange = (newType: string) => {
    searchParams.set("type", newType);
    setSearchParams(searchParams);
  };

  const handleCategoryChange = (newCategory: string) => {
    searchParams.set("category", newCategory);
    setSearchParams(searchParams);
  };

  const handleDelete = (id: string) => {
    removeTransaction(id);
    addToast("Transaction removed!", "success");
  };

  const filteredTransactions = filterTransactions(
    searchTerm,
    typeFilter,
    categoryFilter,
    transactions,
    urlMonth ?? undefined,
    urlYear ?? undefined,
  );

  return (
    <>
      <WithSkeleton isLoading={isLoading} skeleton={<TransactionSkeleton />}>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Transactions
            </h2>
            <p className="mt-2 text-slate-400">
              View and manage your complete transaction history.
            </p>
          </div>
          <TransactionTable
            transactions={filteredTransactions}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            typeFilter={typeFilter}
            onTypeChange={handleTypeChange}
            categoryFilter={categoryFilter}
            onCategoryChange={handleCategoryChange}
            onDelete={handleDelete}
            currency={currency}
            setIsModalOpen={setIsModalOpen}
            showAddButton={true}
          />
        </div>
      </WithSkeleton>
    </>
  );
};
