import { TransactionSkeleton } from "../components/transaction/TransactionSkeleton";
import { TransactionTable } from "../components/transaction/TransactionTable";
import { WithSkeleton } from "../components/ui/WithSkeleton";
import { useFinanceStore } from "../store/useFinanceStore";

type TransactionsProps = {
  setIsModalOpen: (value: boolean) => void;
  isLoading: boolean;
};

export const Transactions = ({
  setIsModalOpen,
  isLoading,
}: TransactionsProps) => {
  const transactions = useFinanceStore((state) => state.transactions);
  const currency = useFinanceStore((state) => state.currency);
  return (
    <>
      <WithSkeleton isLoading={isLoading} skeleton={<TransactionSkeleton />}>
        <TransactionTable
          transactions={transactions}
          currency={currency}
          setIsModalOpen={setIsModalOpen}
          showAddButton={true}
        />
      </WithSkeleton>
    </>
  );
};
