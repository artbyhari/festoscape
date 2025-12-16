import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'secondary';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
    children, 
    variant = 'primary', 
    isLoading = false, 
    className = '',
    ...props 
}) => {
    const baseStyles = "px-8 py-4 rounded-sm font-bold uppercase tracking-wider text-sm transition duration-300 flex items-center justify-center gap-2";
    
    const variants = {
        primary: "bg-gold-btn text-festo-dark hover:scale-[1.02] shadow-lg",
        outline: "border border-festo-gold text-festo-gold hover:bg-festo-gold hover:text-festo-dark",
        secondary: "bg-festo-accent text-gray-200 hover:bg-festo-card border border-festo-accent hover:border-festo-gold"
    };

    return (
        <button 
            className={`${baseStyles} ${variants[variant]} ${isLoading ? 'opacity-80 cursor-not-allowed' : ''} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
};
