"use client";
type SectionHeaderProps = {
  title: string;
  linkText?: string;
  onLinkClick?: () => void;
};

const SectionHeader = ({
  title,
  linkText,
  onLinkClick,
}: SectionHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-primary font-semibold">{title}</h2>
      {linkText && (
        <button
          onClick={onLinkClick}
          className="text-sm text-muted hover:text-primary transition-colors"
        >
          {linkText}
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
