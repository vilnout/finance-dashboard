type AddTransactionButtonProps = {
  onClick: () => void;
  className?: string;
};

export const AddTransactionButton = ({
  onClick,
  className = "",
}: AddTransactionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} cursor-pointer rounded-lg bg-blue-600 p-3 font-bold text-white transition-colors hover:bg-blue-500`}
    >
      Add Transaction
    </button>
  );
};
