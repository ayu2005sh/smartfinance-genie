
import React from 'react';
import { useBankAccounts, BankAccount } from '@/hooks/useBankAccounts';
import { Button } from '@/components/ui/button';
import Card from '@/components/ui-custom/Card';
import { Building, CreditCard, MoreVertical, CheckCircle2, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import BankAccountForm from './BankAccountForm';

function maskAccountNumber(accountNumber: string) {
  if (accountNumber.length <= 4) return accountNumber;
  const lastFour = accountNumber.slice(-4);
  return `••••••${lastFour}`;
}

const BankAccountCard: React.FC<{
  account: BankAccount;
  onSetPrimary: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ account, onSetPrimary, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const getIcon = () => {
    switch (account.account_type) {
      case 'credit':
        return <CreditCard className="h-6 w-6" />;
      default:
        return <Building className="h-6 w-6" />;
    }
  };

  return (
    <Card
      variant="glass"
      className="p-4 relative"
    >
      {confirmDelete ? (
        <div className="p-3 bg-destructive/10 rounded-md">
          <p className="mb-2 font-medium">Remove this account?</p>
          <div className="flex gap-2">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onDelete(account.id)}
            >
              Confirm
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                {getIcon()}
              </div>
              <div>
                <h3 className="font-medium">{account.account_name}</h3>
                <p className="text-sm text-muted-foreground">
                  {account.bank_name}
                </p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {!account.is_primary && (
                  <DropdownMenuItem onClick={() => onSetPrimary(account.id)}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    <span>Set as Default</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  onClick={() => setConfirmDelete(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Remove Account</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Account Number</span>
              <span>{maskAccountNumber(account.account_number)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Account Type</span>
              <span className="capitalize">{account.account_type}</span>
            </div>
          </div>
          
          {account.is_primary && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Default
              </span>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

const BankAccountList: React.FC = () => {
  const { bankAccounts, isLoading, error, setPrimaryAccount, deleteBankAccount } = useBankAccounts();
  const { user } = useAuth();
  const [isAddingAccount, setIsAddingAccount] = React.useState(false);
  
  if (!user) {
    return (
      <Alert>
        <AlertDescription>
          Please sign in to manage your bank accounts.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (isLoading) {
    return <div className="text-center py-8">Loading your accounts...</div>;
  }
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading your accounts. Please try again.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Bank Accounts</h2>
        <Dialog open={isAddingAccount} onOpenChange={setIsAddingAccount}>
          <DialogTrigger asChild>
            <Button>Link New Account</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Link a Bank Account</DialogTitle>
              <DialogDescription>
                Enter your bank account details to connect it to your profile.
              </DialogDescription>
            </DialogHeader>
            <BankAccountForm onSuccess={() => setIsAddingAccount(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      {bankAccounts && bankAccounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bankAccounts.map((account) => (
            <BankAccountCard
              key={account.id}
              account={account}
              onSetPrimary={setPrimaryAccount.mutate}
              onDelete={deleteBankAccount.mutate}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed rounded-lg bg-muted/50">
          <Building className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No Bank Accounts Linked</h3>
          <p className="mt-1 text-muted-foreground">
            Connect your bank accounts to track your finances automatically.
          </p>
          <Button className="mt-4" onClick={() => setIsAddingAccount(true)}>
            Link Your First Account
          </Button>
        </div>
      )}
    </div>
  );
};

export default BankAccountList;
