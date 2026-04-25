export type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost" | "none" | "pill-brand" | "pill-blue" | "pill-red" | "pill-green" | "pill-yellow" | "pill-purple" | "pill-gray";
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
}
