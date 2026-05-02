type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};

const Label = ({ children, htmlFor, className }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
};

export default Label;
