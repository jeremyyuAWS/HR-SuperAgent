import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  isLoading = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-gray-300 focus:ring-opacity-50 inline-flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-gray-900 text-white hover:bg-gray-700 active:bg-gray-800',
    secondary: 'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800',
    outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700',
    ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
    link: 'bg-transparent text-gray-600 dark:text-gray-400 hover:underline p-0'
  };
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-2',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const loadingClass = isLoading ? 'relative text-transparent transition-none hover:text-transparent' : '';
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    disabledClass,
    loadingClass,
    className
  ].join(' ');
  
  return (
    <button className={classes} disabled={isLoading || props.disabled} {...props}>
      {icon && <span className={`mr-2 ${isLoading ? 'opacity-0' : ''}`}>{icon}</span>}
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </button>
  );
};

export default Button;