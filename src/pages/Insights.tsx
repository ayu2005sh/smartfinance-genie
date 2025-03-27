
import React, { useEffect } from 'react';
import { PieChart, BarChart, LineChart, ArrowUpRight, Download, PlusCircle, Brain } from 'lucide-react';
import Card from '@/components/ui-custom/Card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Insights = () => {
  useEffect(() => {
    document.title = 'Insights | AIconomy';
  }, []);

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-semibold mb-1">AI-Powered Insights</h1>
      <p className="text-muted-foreground mb-8">Intelligent financial analysis and predictions</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card variant="glass">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <PieChart className="mr-2 text-primary" size={20} />
              <h2 className="text-xl font-semibold">Expense Breakdown</h2>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Brain className="mr-2 h-4 w-4" />
                Analyze
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <div className="text-center py-12 text-muted-foreground">
            <p className="mb-2">Expense breakdown visualization will appear here</p>
            <p className="text-sm">Track your expenses to see detailed insights</p>
          </div>
        </Card>

        <Card variant="glass">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BarChart className="mr-2 text-primary" size={20} />
              <h2 className="text-xl font-semibold">Income vs Expense</h2>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Brain className="mr-2 h-4 w-4" />
                Predict
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <div className="text-center py-12 text-muted-foreground">
            <p className="mb-2">Income vs Expense chart will appear here</p>
            <p className="text-sm">Add income and expense transactions to generate the chart</p>
          </div>
        </Card>
      </div>

      <Card variant="glass">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <LineChart className="mr-2 text-primary" size={20} />
            <h2 className="text-xl font-semibold">AI Financial Forecast</h2>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <Brain className="mr-2 h-4 w-4" />
              Generate
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <div className="text-center py-12 text-muted-foreground">
          <p className="mb-2">AI-generated financial forecast will appear here</p>
          <p className="text-sm">Connect your accounts to enable AI-powered predictions</p>
        </div>
      </Card>
    </div>
  );
};

export default Insights;
