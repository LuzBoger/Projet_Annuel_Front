import React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    variant?: "default" | "danger" | "warning" | "success" | "ghost";
    size?: "sm" | "md" | "lg";
}

export function IconButton({ 
    icon, 
    variant = "default", 
    size = "md", 
    className = "", 
    ...props 
}: IconButtonProps) {
    
    const baseStyles = "inline-flex items-center justify-center rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    let variantStyles = "";
    switch (variant) {
        case "danger":
            variantStyles = "bg-red-50/40 dark:bg-red-500/20 border-red-200 dark:border-red-500/40 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:text-red-400 dark:hover:bg-red-500/30 focus:ring-red-500";
            break;
        case "warning":
            variantStyles = "bg-orange-50/40 dark:bg-orange-500/20 border-orange-200 dark:border-orange-500/40 text-orange-500 hover:text-orange-600 hover:bg-orange-100 dark:hover:text-orange-400 dark:hover:bg-orange-500/30 focus:ring-orange-500";
            break;
        case "success":
            variantStyles = "bg-green-50/40 dark:bg-green-500/20 border-green-200 dark:border-green-500/40 text-green-500 hover:text-green-600 hover:bg-green-100 dark:hover:text-green-400 dark:hover:bg-green-500/30 focus:ring-green-500";
            break;
        case "ghost":
            variantStyles = "bg-transparent border-transparent text-gray-400 hover:text-brand-600 hover:bg-brand-50/40 dark:hover:bg-brand-500/20 hover:border-brand-200 dark:hover:border-brand-500/40 disabled:opacity-20 disabled:hover:text-gray-400 disabled:hover:bg-transparent focus:ring-brand-500";
            break;
        case "default":
        default:
            variantStyles = "bg-brand-50/40 dark:bg-brand-500/20 border-brand-200 dark:border-brand-500/40 text-brand-600 dark:text-brand-400 hover:text-brand-700 hover:bg-brand-100 dark:hover:text-brand-300 dark:hover:bg-brand-500/30 focus:ring-brand-500";
            break;
    }
    
    let sizeStyles = "";
    switch (size) {
        case "sm":
            sizeStyles = "p-1";
            break;
        case "lg":
            sizeStyles = "p-2";
            break;
        case "md":
        default:
            sizeStyles = "p-1.5";
            break;
    }

    return (
        <button 
            type="button"
            className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
            {...props}
        >
            {icon}
        </button>
    );
}
