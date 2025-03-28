
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from '@/hooks/use-toast';
import { Moon, Sun, Home, Receipt, PieChart, LineChart, Settings, Building, LogOut, User, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = usePreferences();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out"
    });
    navigate('/auth');
  };

  const navigationLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
    { name: "Expenses", path: "/expenses", icon: <Receipt size={18} /> },
    { name: "Budget", path: "/budget", icon: <PieChart size={18} /> },
    { name: "Insights", path: "/insights", icon: <LineChart size={18} /> },
    { name: "Bank Accounts", path: "/bank-accounts", icon: <Building size={18} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <header className="bg-background border-b fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link to="/" className="font-semibold text-xl">
          AIconomy
        </Link>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors",
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
          
          <ThemeToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.email} />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>{user.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          )}
          
          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <nav className="flex flex-col space-y-4">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center py-2 px-3 rounded-md",
                        location.pathname === link.path 
                          ? "bg-primary/10 text-primary" 
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <span className="mr-3">{link.icon}</span>
                      {link.name}
                    </Link>
                  ))}
                </nav>
                
                {user && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.email} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium">{user.email}</div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
