
import React, { useState, useEffect } from 'react';
import Card from '@/components/ui-custom/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePreferences } from '@/contexts/PreferencesContext';
import { CurrencyType } from '@/types/preferences';
import { ArrowRightLeft, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/formatCurrency';

interface CurrencyExchangeProps {
  className?: string;
}

const CurrencyExchange: React.FC<CurrencyExchangeProps> = ({ className }) => {
  const { currencyRates, convertCurrency, isLoading } = usePreferences();
  const [amount, setAmount] = useState<number>(10000);
  const [sourceCurrency, setSourceCurrency] = useState<CurrencyType>('inr');
  const [targetCurrency, setTargetCurrency] = useState<CurrencyType>('usd');
  const [result, setResult] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);

  // Currency symbols for display
  const currencySymbols: Record<string, string> = {
    usd: '$',
    eur: '€',
    gbp: '£',
    jpy: '¥',
    cad: 'C$',
    inr: '₹'
  };

  // Currency full names for display
  const currencyNames: Record<string, string> = {
    usd: 'US Dollar',
    eur: 'Euro',
    gbp: 'British Pound',
    jpy: 'Japanese Yen',
    cad: 'Canadian Dollar',
    inr: 'Indian Rupee'
  };

  // Available currencies
  const currencies = Object.keys(currencySymbols) as CurrencyType[];

  // Calculate exchange
  useEffect(() => {
    if (!isLoading) {
      const convertedAmount = convertCurrency(amount, sourceCurrency, targetCurrency);
      setResult(convertedAmount);
      
      // Calculate and set the exchange rate
      const rate = convertCurrency(1, sourceCurrency, targetCurrency);
      setRate(rate);
    }
  }, [amount, sourceCurrency, targetCurrency, isLoading, convertCurrency]);

  // Handle swapping currencies
  const handleSwapCurrencies = () => {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
  };

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  return (
    <Card variant="glass" className={cn('', className)}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">Currency Exchange</h2>
        <Button variant="ghost" size="icon" title="Refresh rates">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="pl-8"
              min={0}
              step="1"
            />
            <div className="absolute left-3 top-2.5 text-muted-foreground">
              {currencySymbols[sourceCurrency]}
            </div>
          </div>
        </div>

        {/* Currency Selection */}
        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
          <div className="space-y-2">
            <Label htmlFor="fromCurrency">From</Label>
            <Select value={sourceCurrency} onValueChange={(value) => setSourceCurrency(value as CurrencyType)}>
              <SelectTrigger id="fromCurrency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr} value={curr}>
                    {currencySymbols[curr]} {currencyNames[curr]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="mt-7" 
            onClick={handleSwapCurrencies}
            title="Swap currencies"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
          
          <div className="space-y-2">
            <Label htmlFor="toCurrency">To</Label>
            <Select value={targetCurrency} onValueChange={(value) => setTargetCurrency(value as CurrencyType)}>
              <SelectTrigger id="toCurrency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr} value={curr}>
                    {currencySymbols[curr]} {currencyNames[curr]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Result Display */}
        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Exchange Rate</p>
              <p className="font-medium">
                1 {currencySymbols[sourceCurrency]} = {rate.toFixed(4)} {currencySymbols[targetCurrency]}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Converted Amount</p>
              <p className="text-xl font-semibold">
                {formatCurrency(result, targetCurrency)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrencyExchange;
