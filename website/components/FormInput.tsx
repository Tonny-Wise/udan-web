interface FormInputProps {
  id: string;
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  ariaDescribedBy?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

export default function FormInput({
  id,
  name,
  type = "text",
  placeholder,
  required = false,
  className = "",
  ariaDescribedBy,
  value,
  onChange,
  autoComplete,
}: FormInputProps) {
  return (
    <input
      id={id}
      name={name || id}
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      aria-describedby={ariaDescribedBy}
      className={`w-full px-4 py-3 border border-gray-300 rounded focus-visible:ring-2 focus-visible:ring-udan-green-dark focus-visible:outline-none focus-visible:border-udan-green-dark transition-colors ${className}`}
    />
  );
}
