import { clsx } from "clsx";
import { Spinner } from "@/assets/icons";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost";
type ButtonSize = 'sm' | 'md' | 'lg';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
  ghost: 'border border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-200',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};


const variantClass = (variant: ButtonVariant, customClass?: string) => clsx(variants[variant], customClass);
const sizeClass = (size: ButtonSize, customClass?: string) => clsx(sizes[size], customClass);


export function Button({variant = "primary", size = "md", isLoading = false, fullWidth = false, className, children, ...props}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        variantClass(variant, className),
        sizeClass(size, className),
        fullWidth && "w-full"
      )}
      {...props}
    >
      {isLoading && (
        <Spinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
        )}
        {children}

    </button>
  );
}
