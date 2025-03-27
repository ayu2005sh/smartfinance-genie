
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Home, 
  Menu, 
  Moon, 
  Receipt, 
  Settings, 
  Sun, 
  Wallet, 
  X,
  LogOut,
  LogIn 
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useMobile } from '@/hooks/use-mobile';
import ThemeToggle from './ThemeToggle';
import CurrencySelector from './CurrencySelector';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useMobile();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinks = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <Home className="h-4 w-4 mr-2" /> 
    },
    { 
      name: 'Expenses', 
      path: '/expenses', 
      icon: <Receipt className="h-4 w-4 mr-2" /> 
    },
    { 
      name: 'Budget', 
      path: '/budget', 
      icon: <Wallet className="h-4 w-4 mr-2" /> 
    },
    { 
      name: 'Insights', 
      path: '/insights', 
      icon: <BarChart3 className="h-4 w-4 mr-2" /> 
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: <Settings className="h-4 w-4 mr-2" /> 
    }
  ];
  
  const renderNavLinks = () => {
    return navLinks.map((link) => (
      <Link key={link.path} to={link.path}>
        <Button
          variant={isActive(link.path) ? 'default' : 'ghost'}
          className={cn(
            'flex items-center justify-start',
            isActive(link.path) ? 'bg-primary text-primary-foreground' : ''
          )}
          size={isMobile ? 'lg' : 'default'}
        >
          {link.icon}
          {link.name}
        </Button>
      </Link>
    ));
  };
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  const renderMobileNav = () => {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">AIconomy</h2>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </div>
          
          <div className="space-y-2 mb-6">
            {renderNavLinks()}
          </div>
          
          <div className="mt-auto space-y-4">
            <ThemeToggle className="w-full" />
            <CurrencySelector className="w-full" />
            
            {user ? (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Link to="/auth" className="w-full">
                <Button variant="outline" className="w-full">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    );
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="flex items-center justify-between h-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center">
          {renderMobileNav()}
          
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold hidden md:block">AIconomy</span>
            <span className="text-xl font-bold md:hidden">A</span>
          </Link>
          
          <nav className="hidden md:flex items-center ml-8 space-x-1">
            {renderNavLinks()}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <CurrencySelector className="hidden md:flex" />
          <ThemeToggle className="hidden md:flex" />
          
          {user ? (
            <Button 
              variant="outline" 
              size="sm"
              className="hidden md:flex"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          ) : (
            <Link to="/auth" className="hidden md:block">
              <Button variant="outline" size="sm">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
