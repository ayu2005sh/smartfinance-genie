
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePreferences } from '@/contexts/PreferencesContext';

interface CurrencySelectorProps {
  className?: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ className }) => {
  const { currency, setCurrency } = usePreferences();
  
  const currencies = [
    { value: 'usd', label: 'USD ($)', symbol: '$' },
    { value: 'eur', label: 'EUR (€)', symbol: '€' },
    { value: 'gbp', label: 'GBP (£)', symbol: '£' },
    { value: 'jpy', label: 'JPY (¥)', symbol: '¥' },
    { value: 'cad', label: 'CAD ($)', symbol: 'C$' },
    { value: 'inr', label: 'INR (₹)', symbol: '₹' }
  ];
  
  return (
    <div className={className}>
      <Select 
        value={currency} 
        onValueChange={(value) => setCurrency(value as any)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((curr) => (
            <SelectItem key={curr.value} value={curr.value}>
              {curr.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
