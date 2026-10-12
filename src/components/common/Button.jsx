import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'gold' | 'aubergine'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-heading font-medium sm:font-semibold rounded-lg transition-all duration-[200ms] ease-out disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  
  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary: "text-white bg-brand-purple hover:bg-brand-purple-hover hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.99] focus-visible:ring-brand-purple shadow-sm",
    secondary: "text-brand-aubergine bg-brand-mauve hover:bg-brand-mauve-border border border-brand-mauve-border hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-[0.99] focus-visible:ring-brand-purple",
    outline: "text-brand-charcoal hover:text-brand-aubergine bg-white hover:bg-brand-mauve/40 border border-brand-border hover:border-brand-purple/30 hover:-translate-y-0.5 hover:shadow-subtle active:translate-y-0 active:scale-[0.99] focus-visible:ring-brand-purple shadow-subtle",
    gold: "text-stone-900 bg-brand-gold hover:bg-[#B38E55] hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-[0.99] focus-visible:ring-brand-gold shadow-sm",
    aubergine: "text-white bg-brand-aubergine hover:bg-brand-aubergine-light hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.99] focus-visible:ring-brand-gold shadow-sm",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
