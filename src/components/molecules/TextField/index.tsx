import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import { forwardRef } from "react";

type TextFieldProps = {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  rightLabel?: React.ReactNode;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, type, id, placeholder, error, rightLabel, ...rest }, ref) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <Label htmlFor={id} className="text-sm font-medium text-primary">
            {label}
          </Label>
          {rightLabel && <span>{rightLabel}</span>}
        </div>
        <Input
          ref={ref}
          type={type}
          id={id}
          placeholder={placeholder}
          className={error ? "border-brand focus:border-brand" : ""}
          {...rest}
        />
        {error && (
          <span className="text-xs text-brand mt-1 block">{error}</span>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;
