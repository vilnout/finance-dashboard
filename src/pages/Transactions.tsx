import { TransactionTable } from "../components/transaction/TransactionTable";

type TransactionsProps = {
  setIsModalOpen: (value: boolean) => void;
};

export const Transactions = ({ setIsModalOpen }: TransactionsProps) => {
  return (
    <>
      <TransactionTable setIsModalOpen={setIsModalOpen} showAddButton={true} />
    </>
  );
};
