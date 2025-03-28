
import React, { useEffect } from 'react';
import Card from '@/components/ui-custom/Card';
import BankAccountList from '@/components/BankAccountList';
import { Shield, Building, ArrowRight, CreditCard } from 'lucide-react';

const BankAccounts = () => {
  useEffect(() => {
    document.title = 'Bank Accounts | AIconomy';
  }, []);
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-semibold mb-1">Bank Accounts</h1>
      <p className="text-muted-foreground mb-8">Connect and manage your bank accounts</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card variant="glass">
            <BankAccountList />
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Account Security
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your financial data is protected with bank-level security and encryption.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>We use 256-bit encryption to protect your data</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Your credentials are never stored on our servers</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>You can remove access to your accounts at any time</span>
              </li>
            </ul>
          </Card>
          
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <Building className="mr-2 h-5 w-5 text-primary" />
              Supported Banks
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              We support most major banks and credit unions.
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 rounded bg-muted/50">Chase</div>
              <div className="p-2 rounded bg-muted/50">Bank of America</div>
              <div className="p-2 rounded bg-muted/50">Wells Fargo</div>
              <div className="p-2 rounded bg-muted/50">Citibank</div>
              <div className="p-2 rounded bg-muted/50">Capital One</div>
              <div className="p-2 rounded bg-muted/50">And many more...</div>
            </div>
          </Card>
          
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <CreditCard className="mr-2 h-5 w-5 text-primary" />
              Why Connect Your Accounts?
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Automatically track and categorize expenses</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Get personalized financial insights</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Keep all your finances in one place</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Simplify budgeting and financial planning</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BankAccounts;
