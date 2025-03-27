
import React, { useEffect } from 'react';
import Card from '@/components/ui-custom/Card';
import FinancialInsights from '@/components/FinancialInsights';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, TrendingUp, LineChart, PieChart, ArrowRight } from 'lucide-react';

const Insights = () => {
  useEffect(() => {
    document.title = 'Insights | FinWise';
  }, []);
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-semibold mb-1">AI Financial Insights</h1>
      <p className="text-muted-foreground mb-8">Smart analysis and personalized recommendations</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Insights</TabsTrigger>
              <TabsTrigger value="spending">Spending</TabsTrigger>
              <TabsTrigger value="saving">Saving</TabsTrigger>
              <TabsTrigger value="investing">Investing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="animate-fade-in">
              <FinancialInsights />
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <TrendingUp className="mr-2 text-primary" size={20} />
                  Spending Patterns
                </h2>
                
                <Card variant="glass">
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">Spending pattern visualization will appear here</p>
                    <p className="text-sm text-muted-foreground mt-2">Continue tracking expenses to see patterns</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="spending" className="animate-fade-in">
              <Card variant="glass">
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Spending insights will appear here</p>
                  <p className="text-sm text-muted-foreground mt-2">Track more expenses to see spending insights</p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="saving" className="animate-fade-in">
              <Card variant="glass">
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Saving insights will appear here</p>
                  <p className="text-sm text-muted-foreground mt-2">Set saving goals to see recommendations</p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="investing" className="animate-fade-in">
              <Card variant="glass">
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Investment insights will appear here</p>
                  <p className="text-sm text-muted-foreground mt-2">Connect investment accounts to see insights</p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card variant="glass" className="mb-6">
            <div className="flex items-center mb-6">
              <LineChart className="mr-2 text-primary" size={20} />
              <h2 className="text-lg font-semibold">Financial Health Score</h2>
            </div>
            
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-36 h-36 mb-4">
                <div className="absolute inset-0 rounded-full border-8 border-muted" />
                <div 
                  className="absolute inset-0 rounded-full border-8 border-primary" 
                  style={{ 
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                    clip: 'rect(0px, 144px, 144px, 72px)' 
                  }} 
                />
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                  82
                </div>
              </div>
              
              <p className="text-center text-sm text-muted-foreground">
                Your financial health is <span className="font-medium text-green-500">good</span>
              </p>
              
              <Button variant="outline" size="sm" className="mt-4">
                View Details
              </Button>
            </div>
          </Card>
          
          <Card variant="glass">
            <div className="flex items-center mb-6">
              <Sparkles className="mr-2 text-primary" size={20} />
              <h2 className="text-lg font-semibold">Financial Goals</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Emergency Fund</h3>
                  <span className="text-sm text-muted-foreground">70%</span>
                </div>
                <div className="h-2 bg-muted rounded-full mb-2">
                  <div className="h-full bg-primary rounded-full" style={{ width: '70%' }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$7,000 saved</span>
                  <span>Target: $10,000</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Vacation Fund</h3>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="h-2 bg-muted rounded-full mb-2">
                  <div className="h-full bg-primary rounded-full" style={{ width: '45%' }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$2,250 saved</span>
                  <span>Target: $5,000</span>
                </div>
              </div>
              
              <div className="p-4 border border-dashed rounded-lg text-center">
                <Button variant="ghost" size="sm" className="text-primary">
                  <PlusCircle size={16} className="mr-1" /> Add New Goal
                </Button>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <Button variant="link" size="sm" className="text-muted-foreground">
                View All Goals <ArrowRight size={12} className="ml-1" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Insights;
