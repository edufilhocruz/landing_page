
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactFormSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  options: { value: string; label: string }[];
}

const ContactFormSelect = ({
  value,
  onValueChange,
  label,
  options
}: ContactFormSelectProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="projectType" className="text-sm font-medium">
        {label}
      </label>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione o tipo de projeto" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ContactFormSelect;
