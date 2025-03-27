
import { CurrencyType } from '@/types/preferences';

const currencySymbols: Record<string, string> = {
  usd: '$',
  eur: '€',
  gbp: '£',
  jpy: '¥',
  cad: 'C$',
  inr: '₹'
};

export const formatCurrency = (
  amount: number,
  currency: CurrencyType = 'usd',
  options: Intl.NumberFormatOptions = {}
): string => {
  const symbol = currencySymbols[currency] || '';
  
  // For INR, use Indian formatting
  if (currency === 'inr') {
    return `${symbol}${new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      ...options
    }).format(amount)}`;
  }
  
  // For JPY, don't show decimals
  if (currency === 'jpy') {
    return `${symbol}${new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
      ...options
    }).format(amount)}`;
  }
  
  // Default formatting for other currencies
  return `${symbol}${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    ...options
  }).format(amount)}`;
};
