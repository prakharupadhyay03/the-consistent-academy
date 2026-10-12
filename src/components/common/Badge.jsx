import React from 'react';

export default function Badge({
  children,
  variant = 'purple', // 'purple' | 'gold' | 'aubergine' | 'mauve' | 'neutral'
  size = 'sm', // 'sm' | 'md'
  className = '',
}) {
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  const variantStyles = {
    purple: 'bg-brand-mauve/70 text-brand-purple border border-brand-mauve-border font-semibold',
    gold: 'bg-brand-gold-light text-[#7C5A26] border border-brand-gold-border font-semibold',
    aubergine: 'bg-brand-aubergine text-white font-medium',
    mauve: 'bg-brand-mauve text-brand-aubergine border border-brand-mauve-border font-semibold',
    neutral: 'bg-white text-brand-charcoal border border-brand-border font-medium shadow-subtle',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md ${sizeStyles[size] || sizeStyles.sm} ${
        variantStyles[variant] || variantStyles.purple
      } ${className}`}
    >
      {children}
    </span>
  );
}
