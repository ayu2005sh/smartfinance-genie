
import React, { useEffect } from 'react';
import Card from '@/components/ui-custom/Card';
import BudgetManager from '@/components/BudgetManager';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, PieChart, TrendingUp, Edit2, Sparkles } from 'lucide-react';
import AnimatedNumber from '@/components/AnimatedNumber';

const Budget = () => {
  useEffect(() => {
    document.title = 'Budget | FinWise';
  }, []);
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-semibold mb-1">Budget Planning</h1>
      <p className="text-muted-foreground mb-8">Set, track, and optimize your budget</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card variant="glass" className="p-6 text-center">
          <p className="text-muted-foreground text-sm mb-1">Monthly Budget</p>
          <p className="text-3xl font-semibold">
            <AnimatedNumber 
              value={3050} 
              prefix="$" 
              decimals={0}
            />
          </p>
          <div className="mt-4">
            <Progress value={65} className="h-2" />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">
                65% used
              </span>
              <span className="text-xs text-muted-foreground">
                $1,067.50 left
              </span>
            </div>
          </div>
        </Card>
        
        <Card variant="glass" className="p-6 text-center">
          <p className="text-muted-foreground text-sm mb-1">Total Spent</p>
          <p className="text-3xl font-semibold">
            <AnimatedNumber 
              value={1982.5} 
              prefix="$" 
              decimals={2}
            />
          </p>
          <div className="mt-4">
            <p className="text-xs text-muted-foreground">vs. Last Month</p>
            <p className="text-sm text-green-500 font-medium">↓ $157.30 (-7.4%)</p>
          </div>
        </Card>
        
        <Card variant="glass" className="p-6 text-center">
          <p className="text-muted-foreground text-sm mb-1">Savings Rate</p>
          <p className="text-3xl font-semibold">
            <AnimatedNumber 
              value={24.5} 
              suffix="%" 
              decimals={1}
            />
          </p>
          <div className="mt-4">
            <p className="text-xs text-muted-foreground">Target: 30%</p>
            <Progress value={81.67} className="h-2 mt-1" />
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="monthly">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
              
              <Button size="sm">
                <PlusCircle className="mr-1 h-4 w-4" /> Create Budget
              </Button>
            </div>
            
            <TabsContent value="monthly" className="animate-fade-in">
              <BudgetManager />
              
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                    Budget Trends
                  </h3>
                </div>
                
                <Card variant="glass">
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">Budget trend visualization will appear here</p>
                    <p className="text-sm text-muted-foreground mt-2">Complete a few months of budgeting to see trends</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="yearly" className="animate-fade-in">
              <Card variant="glass">
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Annual budget visualization will appear here</p>
                  <p className="text-sm text-muted-foreground mt-2">Set up your yearly budget to see it here</p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card variant="glass">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium flex items-center">
                <PieChart className="mr-2 h-5 w-5 text-primary" />
                Adjust Budget
              </h3>
              
              <Button variant="ghost" size="icon">
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select defaultValue="housing">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="food">Food & Dining</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Budget Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input defaultValue="1500" className="pl-8" />
                </div>
              </div>
              
              <Button className="w-full">Update Budget</Button>
            </div>
            
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center mb-4">
                <Sparkles className="mr-2 h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">AI Budget Suggestions</h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm">Consider reducing dining out budget by $75 to increase savings rate.</p>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm">Your entertainment spending is consistently under budget. You could reallocate $50.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Budget;
