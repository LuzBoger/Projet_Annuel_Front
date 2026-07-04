import { useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { MAX_2FA_CODE_LENGTH, REMOVE_NON_NUMERIC_REGEX, TWO_FACTOR_CODE_REGEX } from '@/constants/global';

interface CodeInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
}

export function CodeInput({ length = MAX_2FA_CODE_LENGTH, value, onChange, disabled = false, error = false, autoFocus = true }: CodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus) inputRefs.current[0]?.focus();
  }, [autoFocus]);

  const handleChange = (index: number, inputValue: string) => {
    if (!TWO_FACTOR_CODE_REGEX.test(inputValue)){
      return;
    }
    const newValue = [...value];
    newValue[index] = inputValue.slice(-1);
    onChange(newValue);
    if (inputValue && index < length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text').replace(REMOVE_NON_NUMERIC_REGEX, '');
    if (pastedData.length === length) {
      onChange(pastedData.split(''));
      inputRefs.current[length - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          className={clsx(
            'w-12 h-14 text-center text-2xl font-bold rounded-md shadow-sm',
            'border focus:outline-none focus:ring-2 transition-colors',
            'dark:text-white',
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
      ))}
    </div>
  );
}
