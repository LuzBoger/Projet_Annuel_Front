import { clsx } from "clsx";
import { Spinner } from "@/assets/icons";
import { sizes, variants } from "@/constants/button";

export type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost" | "none";
export type ButtonSize = 'sm' | 'md' | 'lg';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const variantClass = (variant: ButtonVariant, customClass?: string) => clsx(variants[variant], customClass);
const sizeClass = (size: ButtonSize, customClass?: string) => clsx(sizes[size], customClass);


export function Button({variant = "primary", size = "md", isLoading = false, fullWidth = false, className, children, ...props}: ButtonProps) {
  return (
    <button
      className={variant === "none" ? clsx(className, fullWidth && "w-full") : clsx(
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
