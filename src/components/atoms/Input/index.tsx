type InputProps = {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
};

const Input = ({ type, id, name, placeholder, className = "" }: InputProps) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      className={`w-full bg-void border border-raised rounded-lg p-2 text-primary placeholder:text-muted focus:outline-none focus:border-violet transition-colors ${className}`}
    />
  );
};

export default Input;
