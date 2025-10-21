
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading = false, ...props }) => {
  const baseClasses = "px-6 py-3 font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bkg-light dark:focus:ring-offset-bkg-dark disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105";

  const variantClasses = {
    primary: "text-white bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 focus:ring-blue-500",
    secondary: "bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-primary-light dark:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-500",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} disabled={isLoading} {...props}>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
};
