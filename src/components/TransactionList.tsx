
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

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

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
  
  // Sample transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      description: 'Grocery Shopping',
      amount: 85.25,
      category: 'Food & Dining',
      date: '2023-09-15T14:30:00Z',
      type: 'expense'
    },
    {
      id: '2',
      description: 'Salary Deposit',
      amount: 3200.00,
      category: 'Income',
      date: '2023-09-14T09:15:00Z',
      type: 'income'
    },
    {
      id: '3',
      description: 'Gas Station',
      amount: 45.80,
      category: 'Transportation',
      date: '2023-09-13T18:20:00Z',
      type: 'expense'
    },
    {
      id: '4',
      description: 'Coffee Shop',
      amount: 5.25,
      category: 'Coffee',
      date: '2023-09-12T10:30:00Z',
      type: 'expense'
    },
    {
      id: '5',
      description: 'Online Shopping',
      amount: 120.99,
      category: 'Shopping',
      date: '2023-09-11T16:45:00Z',
      type: 'expense'
    },
    {
      id: '6',
      description: 'Rent Payment',
      amount: 1200.00,
      category: 'Housing',
      date: '2023-09-10T11:00:00Z',
      type: 'expense'
    },
    {
      id: '7',
      description: 'Utility Bill',
      amount: 95.50,
      category: 'Utilities',
      date: '2023-09-09T14:20:00Z',
      type: 'expense'
    }
  ];
  
  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter(transaction => 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    })
    .slice(0, limit);
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
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
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center mr-3',
                  transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'
                )}>
                  {transaction.type === 'income' ? 
                    <ArrowDownUp className="h-4 w-4" /> : 
                    getCategoryIcon(transaction.category)
                  }
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{transaction.category} • {formatDate(transaction.date)}</p>
                </div>
              </div>
              <span className={cn(
                'font-semibold',
                transaction.type === 'income' ? 'text-green-600' : ''
              )}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <p>No transactions found</p>
          </div>
        )}
      </div>
      
      {transactions.length > limit && (
        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm">View All Transactions</Button>
        </div>
      )}
    </Card>
  );
};

export default TransactionList;
