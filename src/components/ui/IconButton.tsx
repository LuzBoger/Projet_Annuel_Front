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
    
    const baseStyles = "inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    let variantStyles = "";
    switch (variant) {
        case "danger":
            variantStyles = "text-gray-400 hover:text-red-600 hover:bg-red-50 focus:ring-red-500";
            break;
        case "warning":
            variantStyles = "text-gray-400 hover:text-orange-600 hover:bg-orange-50 focus:ring-orange-500";
            break;
        case "success":
            variantStyles = "text-gray-400 hover:text-green-600 hover:bg-green-50 focus:ring-green-500";
            break;
        case "ghost":
            variantStyles = "text-gray-400 hover:text-indigo-600 hover:bg-gray-100 disabled:opacity-20 disabled:hover:text-gray-400 disabled:hover:bg-transparent focus:ring-indigo-500";
            break;
        case "default":
        default:
            variantStyles = "text-gray-400 hover:text-blue-600 hover:bg-blue-50 focus:ring-blue-500";
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
