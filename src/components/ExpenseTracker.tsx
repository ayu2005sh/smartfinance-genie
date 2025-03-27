
import React, { useState } from 'react';
import Card from '@/components/ui-custom/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Plus, Receipt } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ExpenseTrackerProps {
  className?: string;
  onExpenseAdded?: (expense: Expense) => void;
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newExpense: Expense = {
        id: Date.now().toString(),
        amount: parseFloat(amount),
        category,
        description,
        date: new Date().toISOString(),
      };
      
      if (onExpenseAdded) {
        onExpenseAdded(newExpense);
      }
      
      toast({
        title: "Expense Added",
        description: `$${amount} has been added to your expenses.`,
      });
      
      // Reset form
      setAmount('');
      setCategory('');
      setDescription('');
      setShowForm(false);
      setIsSubmitting(false);
    }, 600);
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
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
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
        <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
          <p>Track your expenses to get personalized insights</p>
          <p className="mt-2 text-sm">Add a new expense using the button above</p>
        </div>
      )}
    </Card>
  );
};

export default ExpenseTracker;
