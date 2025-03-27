
export type ThemeMode = 'light' | 'dark';
export type CurrencyType = 'usd' | 'eur' | 'gbp' | 'jpy' | 'cad' | 'inr';

export interface CurrencyRate {
  base_currency: string;
  target_currency: string;
  rate: number;
}
