import { SelectOption } from "@/types/components/selectOption";
import { ChevronDown } from "@/assets/icons";
import { clsx } from "clsx";

export interface SelectProps<T = string> {
    label?: string;
    value: T;
    options: SelectOption<T>[];
    onChange: (value: T) => void;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    required?: boolean;
    id?: string;
}

export function Select<T extends string = string>({label,value,options,onChange,className = "",placeholder,disabled = false,error,required = false,id}: SelectProps<T>) {
  return (
    <div className={className}>{label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          disabled={disabled}
          className={clsx(
            "w-full pl-3 pr-10 py-2 border rounded-lg appearance-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-gray-900 dark:text-white",
            error ? "border-red-500" : "border-gray-200 dark:border-gray-800",
            disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-60" : "bg-white dark:bg-gray-950"
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
