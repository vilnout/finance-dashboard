import { TransactionTable } from "../components/transaction/TransactionTable";
import { AddTransactionButton } from "../components/ui/AddTransactionButton";

type TransactionsProps = {
  setIsModalOpen: (value: boolean) => void;
};

export const Transactions = ({ setIsModalOpen }: TransactionsProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <TransactionTable setIsModalOpen={setIsModalOpen} showAddButton={true} />
      <div className="sticky bottom-7 hidden self-center sm:block">
        <AddTransactionButton onClick={() => setIsModalOpen(true)} />
      </div>
    </div>
  );
};
