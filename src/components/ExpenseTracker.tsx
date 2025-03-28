
import React, { useState } from 'react';
import Card from '@/components/ui-custom/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Plus, Receipt, ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useTransactions } from '@/hooks/useTransactions';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ExpenseTrackerProps {
  className?: string;
  onExpenseAdded?: (expense: any) => void;
}

const categories = [
  'Food & Dining',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Shopping',
  'Health',
  'Travel',
  'Education',
  'Other'
];

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ className, onExpenseAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const { toast } = useToast();
  const { addTransaction, isLoading: isAddingTransaction } = useTransactions();
  const { currency } = usePreferences();
  const { user } = useAuth();

  const validateForm = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setFormError('Please enter a valid amount');
      return false;
    }
    if (!category) {
      setFormError('Please select a category');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to track expenses",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const parsedAmount = parseFloat(amount);
      
      await addTransaction.mutateAsync({
        amount: parsedAmount,
        category,
        description: description || undefined,
        transaction_date: new Date().toISOString(),
        currency,
      });
      
      // Reset form
      setAmount('');
      setCategory('');
      setDescription('');
      setShowForm(false);
      
      // Call the callback if provided
      if (onExpenseAdded) {
        onExpenseAdded({
          amount: parsedAmount,
          category,
          description,
          date: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setAmount('');
    setCategory('');
    setDescription('');
    setFormError('');
    setShowForm(false);
  };

  return (
    <Card variant="glass" className={cn('', className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Receipt className="mr-2 text-primary" size={20} />
          <h2 className="text-xl font-semibold">Expense Tracker</h2>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "outline" : "default"}
          size="sm"
        >
          {showForm ? (
            "Cancel"
          ) : (
            <>
              <Plus className="mr-1" size={16} /> Add Expense
            </>
          )}
        </Button>
      </div>

      {formError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Add a note about this expense"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" disabled={isAddingTransaction}>
              {isAddingTransaction ? (
                <span className="flex items-center">
                  <span className="animate-pulse mr-2">Processing</span>
                </span>
              ) : (
                <span className="flex items-center">
                  <Check size={16} className="mr-1" /> Save Expense
                </span>
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          {!user ? (
            <div className="text-muted-foreground max-w-sm mx-auto">
              <p className="mb-4">Please log in to track your expenses</p>
              <Button asChild>
                <a href="/auth">Sign in <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
            </div>
          ) : (
            <div className="text-muted-foreground">
              <p>Track your expenses to get personalized insights</p>
              <p className="mt-2 text-sm">Add a new expense using the button above</p>
              <Button 
                className="mt-6" 
                variant="outline"
                onClick={() => setShowForm(true)}
              >
                <Plus className="mr-1" size={16} /> Add Expense
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default ExpenseTracker;
