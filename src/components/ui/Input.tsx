import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', fullWidth = false, icon, ...props }, ref) => {
    const baseClasses = 'rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-1 focus:ring-gray-300 focus:border-gray-300 focus:outline-none';
    const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-700';
    const widthClass = fullWidth ? 'w-full' : '';
    const paddingClass = icon ? 'pl-9' : 'px-3';
    
    const inputClasses = [
      baseClasses,
      errorClasses,
      widthClass,
      paddingClass,
      'py-2 text-sm',
      className
    ].join(' ');
    
    return (
      <div className={widthClass}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              {icon}
            </div>
          )}
          <input
            className={inputClasses}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;