
import { Textarea } from "@/components/ui/textarea";

interface ContactFormTextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
  className?: string;
  maxLength?: number;
  label: string;
}

const ContactFormTextarea = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  className = "w-full",
  maxLength,
  label
}: ContactFormTextareaProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <Textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={className}
        maxLength={maxLength}
      />
    </div>
  );
};

export default ContactFormTextarea;
