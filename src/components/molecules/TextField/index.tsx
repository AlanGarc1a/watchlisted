import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";

type TextFieldProps = {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  rightLabel?: React.ReactNode;
  error?: string;
};

// ✅ Pass error state down to Input
const TextField = ({
  label,
  type,
  id,
  name,
  placeholder,
  rightLabel,
  error,
}: TextFieldProps) => {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-1">
        <Label htmlFor={id} className="text-sm font-medium text-primary">
          {label}
        </Label>
        {rightLabel && <span>{rightLabel}</span>}
      </div>
      <Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={error ? "border-brand focus:border-brand" : ""}
      />
      {error && <span className="text-xs text-brand mt-1 block">{error}</span>}
    </div>
  );
};

export default TextField;
