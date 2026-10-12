import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center', // 'left' | 'center'
  withRule = false,
  className = '',
}) {
  const alignClasses = align === 'left' ? 'text-left' : 'text-center mx-auto';
  const ruleClasses = align === 'left' ? 'mr-auto' : 'mx-auto';

  return (
    <div className={`max-w-3xl mb-12 sm:mb-16 ${alignClasses} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-heading font-bold tracking-wider uppercase bg-brand-mauve text-brand-aubergine border border-brand-mauve-border mb-3.5">
          {badge}
        </div>
      )}
      
      <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-aubergine tracking-tight leading-[1.25]">
        {title}
      </h2>

      {withRule && (
        <div className={`h-0.5 w-12 bg-brand-gold my-3.5 ${ruleClasses}`} />
      )}

      {subtitle && (
        <p className="mt-3.5 text-base sm:text-lg text-brand-charcoal-muted leading-relaxed font-sans font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
