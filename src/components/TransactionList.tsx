
import React, { useState } from 'react';
import Card from '@/components/ui-custom/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowDownUp, 
  Search, 
  Coffee, 
  Car, 
  ShoppingBag, 
  Home, 
  Utensils,
  Lightbulb,
  Film,
  Heart,
  Plane,
  GraduationCap,
  Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePreferences } from '@/contexts/PreferencesContext';
import { formatCurrency } from '@/utils/formatCurrency';
import { useTransactions } from '@/hooks/useTransactions';
import { useAuth } from '@/contexts/AuthContext';

interface TransactionListProps {
  className?: string;
  title?: string;
  showSearch?: boolean;
  limit?: number;
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, React.ReactNode> = {
    'Food & Dining': <Utensils size={16} />,
    'Transportation': <Car size={16} />,
    'Shopping': <ShoppingBag size={16} />,
    'Housing': <Home size={16} />,
    'Coffee': <Coffee size={16} />,
    'Utilities': <Lightbulb size={16} />,
    'Entertainment': <Film size={16} />,
    'Health': <Heart size={16} />,
    'Travel': <Plane size={16} />,
    'Education': <GraduationCap size={16} />,
    'Other': <Package size={16} />
  };
  
  return icons[category] || <Package size={16} />;
};

const TransactionList: React.FC<TransactionListProps> = ({ 
  className, 
  title = "Recent Transactions",
  showSearch = true,
  limit = 5
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { currency, convertCurrency } = usePreferences();
  const { transactions, isLoading } = useTransactions();
  const { user } = useAuth();
  
  // Filter and sort transactions
  const filteredTransactions = transactions
    ? transactions
        .filter(transaction => 
          transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          const dateA = new Date(a.transaction_date).getTime();
          const dateB = new Date(b.transaction_date).getTime();
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        })
        .slice(0, limit)
    : [];
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getFormattedAmount = (transaction: any) => {
    // Convert the amount to the user's preferred currency
    const convertedAmount = convertCurrency(
      transaction.amount,
      (transaction.currency || 'usd') as any,
      currency
    );
    
    return formatCurrency(convertedAmount, currency);
  };
  
  // If not logged in, show message
  if (!user) {
    return (
      <Card variant="glass" className={cn('', className)}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="py-8 text-center text-muted-foreground">
          <p>Please log in to view your transactions</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card variant="glass" className={cn('', className)}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">{title}</h2>
        {showSearch && (
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8 h-9 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={toggleSortOrder}
              title={`Sort by date (${sortOrder === 'asc' ? 'oldest first' : 'newest first'})`}
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        {isLoading ? (
          <div className="py-8 text-center text-muted-foreground animate-pulse">
            <p>Loading transactions...</p>
          </div>
        ) : filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center mr-3',
                  'bg-primary/10 text-primary'
                )}>
                  {getCategoryIcon(transaction.category)}
                </div>
                <div>
                  <p className="font-medium">{transaction.description || transaction.category}</p>
                  <p className="text-xs text-muted-foreground">{transaction.category} • {formatDate(transaction.transaction_date)}</p>
                </div>
              </div>
              <span className="font-semibold">
                -{getFormattedAmount(transaction)}
              </span>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <p>No transactions found</p>
          </div>
        )}
      </div>
      
      {transactions && transactions.length > limit && (
        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm">View All Transactions</Button>
        </div>
      )}
    </Card>
  );
};

export default TransactionList;
