import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const baseStyles =
  "w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`${baseStyles} ${error ? "border-rose-500 focus:ring-rose-500" : "focus:border-blue-500"} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-rose-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
