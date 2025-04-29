import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  primary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  secondary: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  info: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300'
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseClasses = 'inline-block rounded-full px-2 py-0.5 text-xs font-medium';
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;