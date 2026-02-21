import { clsx } from 'clsx';
import { forwardRef } from 'react';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, className, ...props }, ref) => {
return (
  <input
    ref={ref}
    className={clsx(
      'block w-full px-3 py-2 rounded-md shadow-sm transition-colors',
      'border focus:outline-none focus:ring-2',
      error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
      className
    )}
    {...props}
  />
  );
});

Input.displayName = 'Input';