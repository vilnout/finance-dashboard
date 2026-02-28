import { TransactionSkeleton } from "../components/transaction/TransactionSkeleton";
import { TransactionTable } from "../components/transaction/TransactionTable";
import { WithSkeleton } from "../components/ui/WithSkeleton";

type TransactionsProps = {
  setIsModalOpen: (value: boolean) => void;
  isLoading: boolean;
};

export const Transactions = ({
  setIsModalOpen,
  isLoading,
}: TransactionsProps) => {
  return (
    <>
      <WithSkeleton isLoading={isLoading} skeleton={<TransactionSkeleton />}>
        <TransactionTable
          setIsModalOpen={setIsModalOpen}
          showAddButton={true}
        />
      </WithSkeleton>
    </>
  );
};
