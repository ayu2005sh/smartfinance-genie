
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'solid';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  animation?: 'none' | 'fade-in' | 'scale-in' | 'blur-in';
}

const Card = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  animation = 'none',
  ...props
}: CardProps) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const animationStyles = {
    none: '',
    'fade-in': 'animate-fade-in',
    'scale-in': 'animate-scale-in',
    'blur-in': 'animate-blur-in',
  };

  const variantStyles = {
    default: 'bg-card text-card-foreground shadow-sm',
    glass: 'card-glass',
    solid: 'bg-secondary border-none',
  };

  return (
    <div
      className={cn(
        'rounded-xl border transition-all duration-300',
        variantStyles[variant],
        paddingStyles[padding],
        animationStyles[animation],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
