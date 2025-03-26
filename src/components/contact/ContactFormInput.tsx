
import { Input } from "@/components/ui/input";

interface ContactFormInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  className?: string;
  maxLength?: number;
  autoComplete?: string;
  type?: string;
  pattern?: string;
  label: string;
}

const ContactFormInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = "w-full",
  maxLength,
  autoComplete,
  type = "text",
  pattern,
  label
}: ContactFormInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={className}
        maxLength={maxLength}
        autoComplete={autoComplete}
        pattern={pattern}
      />
    </div>
  );
};

export default ContactFormInput;
