
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

type ThemeMode = 'light' | 'dark';
type CurrencyType = 'usd' | 'eur' | 'gbp' | 'jpy' | 'cad' | 'inr';

interface CurrencyRate {
  base_currency: string;
  target_currency: string;
  rate: number;
}

interface PreferencesContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  convertCurrency: (amount: number, from: CurrencyType, to: CurrencyType) => number;
  isLoading: boolean;
  currencyRates: CurrencyRate[];
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [currency, setCurrency] = useState<CurrencyType>('usd');
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id || null);
    });

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };
    
    getInitialSession();
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Load user preferences
  useEffect(() => {
    if (!userId) {
      // If no user is logged in, try to load from localStorage
      const savedTheme = localStorage.getItem('theme') as ThemeMode;
      const savedCurrency = localStorage.getItem('currency') as CurrencyType;
      
      if (savedTheme) setTheme(savedTheme);
      if (savedCurrency) setCurrency(savedCurrency);
      
      setIsLoading(false);
      return;
    }

    const fetchUserPreferences = async () => {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('theme_preference, currency_preference')
          .eq('id', userId)
          .single();

        if (error) throw error;
        
        if (data) {
          if (data.theme_preference) setTheme(data.theme_preference as ThemeMode);
          if (data.currency_preference) setCurrency(data.currency_preference as CurrencyType);
        }
      } catch (error) {
        console.error('Error loading user preferences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPreferences();
  }, [userId]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
    
    // Save preference to database if logged in
    if (userId) {
      supabase
        .from('user_profiles')
        .update({ theme_preference: theme, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .then(({ error }) => {
          if (error) console.error('Error saving theme preference:', error);
        });
    }
  }, [theme, userId]);

  // Save currency preference
  useEffect(() => {
    localStorage.setItem('currency', currency);
    
    // Save preference to database if logged in
    if (userId) {
      supabase
        .from('user_profiles')
        .update({ currency_preference: currency, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .then(({ error }) => {
          if (error) console.error('Error saving currency preference:', error);
        });
    }
  }, [currency, userId]);

  // Fetch currency rates
  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const { data, error } = await supabase
          .from('currency_rates')
          .select('base_currency, target_currency, rate');

        if (error) throw error;
        
        if (data) {
          setCurrencyRates(data);
        }
      } catch (error) {
        console.error('Error loading currency rates:', error);
      }
    };

    fetchCurrencyRates();
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const convertCurrency = (amount: number, from: CurrencyType, to: CurrencyType): number => {
    if (from === to) return amount;
    
    // Direct conversion
    const directRate = currencyRates.find(
      rate => rate.base_currency === from && rate.target_currency === to
    );
    
    if (directRate) {
      return amount * directRate.rate;
    }
    
    // Conversion through USD
    const fromToUsd = currencyRates.find(
      rate => rate.base_currency === 'usd' && rate.target_currency === from
    );
    
    const usdToTarget = currencyRates.find(
      rate => rate.base_currency === 'usd' && rate.target_currency === to
    );
    
    if (fromToUsd && usdToTarget) {
      // First convert to USD, then to target currency
      return amount * (1 / fromToUsd.rate) * usdToTarget.rate;
    }
    
    // If no conversion path found, return original amount
    console.warn(`No conversion path found from ${from} to ${to}`);
    return amount;
  };

  return (
    <PreferencesContext.Provider value={{
      theme,
      toggleTheme,
      currency,
      setCurrency,
      convertCurrency,
      isLoading,
      currencyRates
    }}>
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
