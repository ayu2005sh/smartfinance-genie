
import React, { useState } from 'react';
import Card from '@/components/ui-custom/Card';
import { Button } from '@/components/ui/button';
import { Link, BankIcon, PlusCircle, CreditCard, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AccountIntegrationProps {
  className?: string;
}

interface AccountType {
  id: string;
  name: string;
  icon: React.ReactNode;
  isConnected: boolean;
}

const AccountIntegration: React.FC<AccountIntegrationProps> = ({ className }) => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  
  const accountTypes: AccountType[] = [
    {
      id: '1',
      name: 'Bank Account',
      icon: <BankIcon size={24} />,
      isConnected: true
    },
    {
      id: '2',
      name: 'Credit Card',
      icon: <CreditCard size={24} />,
      isConnected: false
    },
    {
      id: '3',
      name: 'Investment Account',
      icon: <Link size={24} />,
      isConnected: false
    }
  ];
  
  const handleConnect = (accountType: string) => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      toast({
        title: "Account Connected",
        description: `Your ${accountType} has been successfully connected.`,
      });
      
      setIsConnecting(false);
    }, 1500);
  };
  
  return (
    <Card variant="glass" className={cn('', className)}>
      <div className="flex items-center mb-6">
        <Link className="mr-2 text-primary" size={20} />
        <h2 className="text-xl font-semibold">Connect Accounts</h2>
      </div>
      
      <div className="space-y-4">
        {accountTypes.map((account) => (
          <div 
            key={account.id}
            className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors duration-300 animate-fade-in"
            style={{ animationDelay: `${parseInt(account.id) * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  {account.icon}
                </div>
                <div>
                  <h3 className="font-medium">{account.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {account.isConnected ? 
                      'Connected and syncing' : 
                      'Connect to automate tracking'
                    }
                  </p>
                </div>
              </div>
              
              {account.isConnected ? (
                <div className="flex items-center text-green-500">
                  <CheckCircle2 size={16} className="mr-1" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={isConnecting}
                  onClick={() => handleConnect(account.name)}
                >
                  <PlusCircle size={16} className="mr-1" />
                  Connect
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Button variant="link" className="text-sm">
          <PlusCircle size={16} className="mr-1" />
          Add another account
        </Button>
      </div>
    </Card>
  );
};

export default AccountIntegration;
