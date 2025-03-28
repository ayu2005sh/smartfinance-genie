
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode, CurrencyType, CurrencyRate } from '@/types/preferences';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PreferencesContextProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  currencyRates: CurrencyRate[];
  convertCurrency: (amount: number, from: CurrencyType, to: CurrencyType) => number;
  isLoading: boolean;
}

const PreferencesContext = createContext<PreferencesContextProps | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [currency, setCurrencyState] = useState<CurrencyType>('inr');
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch currency rates from Supabase
  useEffect(() => {
    async function fetchCurrencyRates() {
      try {
        const { data, error } = await supabase
          .from('currency_rates')
          .select('*');
          
        if (error) throw error;
        
        const rates: CurrencyRate[] = data.map(rate => ({
          base_currency: rate.base_currency,
          target_currency: rate.target_currency,
          rate: rate.rate
        }));
        
        setCurrencyRates(rates);
      } catch (error: any) {
        console.error('Error fetching currency rates:', error.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCurrencyRates();
  }, []);
  
  // Fetch user preferences when user is loaded
  useEffect(() => {
    if (!user) return;
    
    async function fetchUserPreferences() {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('theme_preference, currency_preference')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setTheme(data.theme_preference as ThemeMode || 'light');
          setCurrencyState(data.currency_preference as CurrencyType || 'inr');
        }
      } catch (error: any) {
        console.error('Error fetching user preferences:', error.message);
      }
    }
    
    fetchUserPreferences();
  }, [user]);
  
  // Update document theme when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  // Toggle theme
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Save to backend if user is logged in
    if (user) {
      try {
        const { error } = await supabase
          .from('user_profiles')
          .update({ theme_preference: newTheme, updated_at: new Date().toISOString() })
          .eq('id', user.id);
          
        if (error) throw error;
      } catch (error: any) {
        console.error('Error updating theme preference:', error.message);
        toast({
          title: "Error",
          description: "Failed to save theme preference",
          variant: "destructive",
        });
      }
    }
  };
  
  // Set currency
  const setCurrency = async (newCurrency: CurrencyType) => {
    setCurrencyState(newCurrency);
    
    // Save to backend if user is logged in
    if (user) {
      try {
        const { error } = await supabase
          .from('user_profiles')
          .update({ currency_preference: newCurrency, updated_at: new Date().toISOString() })
          .eq('id', user.id);
          
        if (error) throw error;
        
        toast({
          title: "Currency Updated",
          description: `Currency changed to ${newCurrency.toUpperCase()}`,
        });
      } catch (error: any) {
        console.error('Error updating currency preference:', error.message);
        toast({
          title: "Error",
          description: "Failed to save currency preference",
          variant: "destructive",
        });
      }
    }
  };
  
  // Currency conversion helper
  const convertCurrency = (amount: number, from: CurrencyType, to: CurrencyType): number => {
    if (from === to) return amount;
    
    // Direct conversion rate (e.g., USD to EUR)
    const directRate = currencyRates.find(
      rate => rate.base_currency === from && rate.target_currency === to
    );
    
    if (directRate) {
      return amount * directRate.rate;
    }
    
    // Reverse rate (e.g., EUR to USD)
    const reverseRate = currencyRates.find(
      rate => rate.base_currency === to && rate.target_currency === from
    );
    
    if (reverseRate) {
      return amount / reverseRate.rate;
    }
    
    // Using USD as intermediate (e.g., GBP to EUR = GBP to USD, then USD to EUR)
    const fromToUsd = currencyRates.find(
      rate => rate.base_currency === 'usd' && rate.target_currency === from
    );
    
    const usdToTarget = currencyRates.find(
      rate => rate.base_currency === 'usd' && rate.target_currency === to
    );
    
    if (fromToUsd && usdToTarget) {
      // Convert to USD first, then to target
      const amountInUsd = amount / fromToUsd.rate;
      return amountInUsd * usdToTarget.rate;
    }
    
    // Fallback - no conversion possible
    console.warn(`No conversion rate found for ${from} to ${to}`);
    return amount;
  };
  
  return (
    <PreferencesContext.Provider
      value={{
        theme,
        toggleTheme,
        currency,
        setCurrency,
        currencyRates,
        convertCurrency,
        isLoading
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
