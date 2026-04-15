import { clsx } from 'clsx';
import { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ error, className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={clsx(
        'block w-full px-3 py-2 rounded-md shadow-sm transition-all duration-200 resize-none',
        'border focus:outline-none focus:ring-2',
        'bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500',
        error 
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
          : 'border-gray-300 dark:border-gray-800 focus:ring-brand-500 focus:border-brand-500',
        className
      )}
      {...props}
    />
  );
});

TextArea.displayName = 'TextArea';
