
import React, { useEffect } from 'react';
import DashboardOverview from '@/components/DashboardOverview';
import TransactionList from '@/components/TransactionList';
import BudgetManager from '@/components/BudgetManager';
import FinancialInsights from '@/components/FinancialInsights';
import ExpenseTracker from '@/components/ExpenseTracker';
import AccountIntegration from '@/components/AccountIntegration';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard | AIconomy';
  }, []);

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-semibold mb-1">Welcome to AIconomy</h1>
      <p className="text-muted-foreground mb-8">Your AI-powered financial assistant</p>
      
      <DashboardOverview className="mb-8" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <TransactionList />
        <BudgetManager />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <FinancialInsights />
        <AccountIntegration />
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-6">
            <TabsTrigger value="expenses">Track Expenses</TabsTrigger>
            <TabsTrigger value="insights">Weekly Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses" className="animate-fade-in">
            <ExpenseTracker />
          </TabsContent>
          <TabsContent value="insights" className="animate-fade-in">
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-2">Weekly analytics visualization will appear here</p>
              <p className="text-sm">Track your expenses for at least a week to see insights</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
