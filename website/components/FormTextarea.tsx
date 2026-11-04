interface FormTextareaProps {
  id: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  ariaDescribedBy?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function FormTextarea({
  id,
  name,
  placeholder,
  required = false,
  rows = 4,
  className = "",
  ariaDescribedBy,
  value,
  onChange,
}: FormTextareaProps) {
  return (
    <textarea
      id={id}
      name={name || id}
      placeholder={placeholder}
      required={required}
      rows={rows}
      value={value}
      onChange={onChange}
      aria-describedby={ariaDescribedBy}
      className={`w-full px-4 py-3 border border-gray-300 rounded focus-visible:ring-2 focus-visible:ring-udan-green-dark focus-visible:outline-none focus-visible:border-udan-green-dark transition-colors ${className}`}
    />
  );
}
