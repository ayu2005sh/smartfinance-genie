
import React, { useState, useEffect } from 'react';
import Card from '@/components/ui-custom/Card';
import ExpenseTracker, { Expense } from '@/components/ExpenseTracker';
import TransactionList from '@/components/TransactionList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download } from 'lucide-react';

const Expenses = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  useEffect(() => {
    document.title = 'Expenses | AIconomy';
  }, []);
  
  const handleExpenseAdded = (expense: Expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  };
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-semibold mb-1">Expense Management</h1>
      <p className="text-muted-foreground mb-8">Track, analyze, and manage your expenses</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card variant="glass" className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-semibold">Expense Overview</h2>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search expenses..."
                    className="pl-8 h-9 w-[200px]"
                  />
                </div>
                <Select defaultValue="thisMonth">
                  <SelectTrigger className="h-9 w-[130px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thisWeek">This Week</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="w-full max-w-md grid grid-cols-3 mb-6">
                <TabsTrigger value="all">All Expenses</TabsTrigger>
                <TabsTrigger value="recurring">Recurring</TabsTrigger>
                <TabsTrigger value="one-time">One-time</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="animate-fade-in">
                <TransactionList showSearch={false} limit={10} title="" />
              </TabsContent>
              
              <TabsContent value="recurring" className="animate-fade-in">
                <div className="text-center py-12 text-muted-foreground">
                  <p>No recurring expenses found</p>
                  <p className="text-sm mt-2">Recurring expenses will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="one-time" className="animate-fade-in">
                <div className="text-center py-12 text-muted-foreground">
                  <p>No one-time expenses found</p>
                  <p className="text-sm mt-2">One-time expenses will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="glass" className="p-6 text-center">
              <p className="text-muted-foreground text-sm mb-1">Total Expenses</p>
              <p className="text-2xl font-semibold">$2,540.50</p>
              <p className="text-xs text-red-500 mt-1">↑ 12% vs last month</p>
            </Card>
            <Card variant="glass" className="p-6 text-center">
              <p className="text-muted-foreground text-sm mb-1">Biggest Category</p>
              <p className="text-2xl font-semibold">Housing</p>
              <p className="text-xs text-muted-foreground mt-1">47% of total expenses</p>
            </Card>
            <Card variant="glass" className="p-6 text-center">
              <p className="text-muted-foreground text-sm mb-1">Average Daily</p>
              <p className="text-2xl font-semibold">$84.68</p>
              <p className="text-xs text-green-500 mt-1">↓ 3% vs last month</p>
            </Card>
          </div>
        </div>
        
        <div>
          <ExpenseTracker onExpenseAdded={handleExpenseAdded} />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
