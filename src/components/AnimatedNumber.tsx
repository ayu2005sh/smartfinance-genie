
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

const AnimatedNumber = ({
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(0);
  
  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = value;
    const startTime = Date.now();
    
    const animateValue = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        // Easing function - ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (endValue - startValue) * easeProgress;
        setDisplayValue(currentValue);
        requestAnimationFrame(animateValue);
      } else {
        setDisplayValue(endValue);
        prevValueRef.current = endValue;
      }
    };
    
    requestAnimationFrame(animateValue);
    
    return () => {
      prevValueRef.current = displayValue;
    };
  }, [value, duration]);
  
  const formattedValue = displayValue.toFixed(decimals);
  
  return (
    <span className={cn('font-medium transition-colors duration-300', className)}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

export default AnimatedNumber;
