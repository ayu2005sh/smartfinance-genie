
import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { usePreferences } from '@/contexts/PreferencesContext';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = usePreferences();
  
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-2">
        {theme === 'light' ? (
          <SunIcon className="h-5 w-5 text-amber-500" />
        ) : (
          <MoonIcon className="h-5 w-5 text-blue-400" />
        )}
        <span className="font-medium">
          {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
        </span>
      </div>
      <Switch 
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
    </div>
  );
};

export default ThemeToggle;
