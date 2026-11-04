interface FormLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  srOnly?: boolean;
}

export default function FormLabel({ htmlFor, children, required = false, srOnly = false }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-semibold text-udan-dark mb-2 block ${srOnly ? 'sr-only' : ''}`}
    >
      {children}
      {required && <span aria-label="required"> *</span>}
    </label>
  );
}
