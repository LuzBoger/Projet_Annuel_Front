import { SelectOption } from "@/types/components/selectOption";

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
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 dark:text-white
        ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-800"}
        ${disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-60" : "bg-white dark:bg-gray-900"}`}
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
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
