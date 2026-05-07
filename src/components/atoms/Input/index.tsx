import { forwardRef } from "react";

type InputProps = {
  type: string;
  id: string;
  placeholder?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, placeholder, className = "", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full bg-raised border border-raised rounded-lg p-2 text-primary placeholder:text-muted focus:outline-none focus:border-violet transition-colors ${className}`}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
