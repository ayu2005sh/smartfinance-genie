
import React from 'react';
import Card from '@/components/ui-custom/Card';
import { Progress } from '@/components/ui/progress';
import { PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

interface BudgetManagerProps {
  className?: string;
}

const BudgetManager: React.FC<BudgetManagerProps> = ({ className }) => {
  const budgetCategories: BudgetCategory[] = [
    {
      id: '1',
      name: 'Housing',
      allocated: 1500,
      spent: 1200,
      color: 'bg-blue-500',
    },
    {
      id: '2',
      name: 'Food & Dining',
      allocated: 600,
      spent: 450,
      color: 'bg-green-500',
    },
    {
      id: '3',
      name: 'Transportation',
      allocated: 400,
      spent: 380,
      color: 'bg-amber-500',
    },
    {
      id: '4',
      name: 'Entertainment',
      allocated: 300,
      spent: 275,
      color: 'bg-purple-500',
    },
    {
      id: '5',
      name: 'Shopping',
      allocated: 250,
      spent: 310,
      color: 'bg-red-500',
    },
  ];

  const calculatePercentage = (spent: number, allocated: number) => {
    return Math.min(Math.round((spent / allocated) * 100), 100);
  };

  const getStatusColor = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage < 70) return 'text-green-500';
    if (percentage < 90) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <Card variant="glass" className={cn('', className)}>
      <div className="flex items-center mb-6">
        <PieChart className="mr-2 text-primary" size={20} />
        <h2 className="text-xl font-semibold">Monthly Budget</h2>
      </div>

      <div className="space-y-5">
        {budgetCategories.map((category) => (
          <div key={category.id} className="animate-fade-in" style={{ animationDelay: `${parseInt(category.id) * 100}ms` }}>
            <div className="flex justify-between mb-1">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${category.color}`}></div>
                <span className="font-medium">{category.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={cn(
                  'text-sm font-medium',
                  getStatusColor(category.spent, category.allocated)
                )}>
                  ${category.spent}
                </span>
                <span className="text-sm text-muted-foreground">/ ${category.allocated}</span>
              </div>
            </div>
            <Progress 
              value={calculatePercentage(category.spent, category.allocated)} 
              className={cn(
                'h-2',
                category.spent > category.allocated ? 'bg-muted text-red-500' : 'bg-muted'
              )}
              indicatorClassName={category.color}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">
                {calculatePercentage(category.spent, category.allocated)}% used
              </span>
              <span className="text-xs text-muted-foreground">
                ${category.allocated - category.spent} left
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BudgetManager;
