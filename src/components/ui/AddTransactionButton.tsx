type AddTransactionButtonProps = {
  onClick: () => void;
};

export const AddTransactionButton = ({
  onClick,
}: AddTransactionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer rounded-lg bg-blue-600 p-3 font-bold text-white transition-colors hover:bg-blue-500"
    >
      Add Transaction
    </button>
  );
};
