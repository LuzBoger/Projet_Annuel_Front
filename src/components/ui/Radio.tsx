import React, { forwardRef } from "react";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ label, className = "", ...props }, ref) => {
        return (
            <div className="flex items-center">
                <input
                    type="radio"
                    ref={ref}
                    className={`w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 focus:ring-offset-gray-50 ${className}`}
                    {...props}
                />
                {label && (
                    <label htmlFor={props.id} className="ml-2 block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
            </div>
        );
    }
);

Radio.displayName = "Radio";
