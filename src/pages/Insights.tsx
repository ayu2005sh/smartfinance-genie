
import React, { useEffect, useState } from 'react';
import { 
  PieChart, 
  BarChart, 
  LineChart, 
  ArrowUpRight, 
  Download, 
  PlusCircle, 
  Brain,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import Card from '@/components/ui-custom/Card';
import FinancialInsights from '@/components/FinancialInsights';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const Insights = () => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [timeFrame, setTimeFrame] = useState('month');
  const [customQuery, setCustomQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Insights | AIconomy';
  }, []);

  const handleGenerateAiInsight = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to use AI insights",
        variant: "destructive"
      });
      return;
    }

    if (!customQuery.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a financial question or goal",
        variant: "destructive"
      });
      return;
    }

    setIsAiLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const responses = [
        "Based on your spending patterns, I recommend setting aside 15% of your monthly income for savings. This aligns with your financial goals and should help you reach your target in approximately 18 months.",
        "Looking at your transaction history, your largest expense category is housing at 35% of your budget. This is within the recommended range of 30-40%. However, your entertainment spending is higher than average at 12%. Consider reducing this to 7-8% to accelerate your savings goals.",
        "To achieve your retirement goal, I suggest increasing your current investments by $150 monthly. With a conservative annual return of 7%, this additional amount could generate approximately $98,000 over the next 20 years.",
        "Your current debt-to-income ratio is approximately 28%, which is in the healthy range. However, by focusing on paying off your highest interest debt first (credit card at 19.99%), you could save approximately $1,200 in interest over the next year.",
        "Based on your transaction history, you tend to spend 22% more on weekends. Setting a specific weekend budget could help control this pattern and increase your monthly savings by approximately $320."
      ];

      setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
      setIsAiLoading(false);
    }, 2000);
  };

  const getRandomDataPlaceholder = () => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 80) + 20);
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-semibold mb-1">AI-Powered Insights</h1>
      <p className="text-muted-foreground mb-8">Intelligent financial analysis and predictions</p>

      <div className="mb-8">
        <Card variant="glass">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Brain className="mr-2 text-primary" size={20} />
              <h2 className="text-xl font-semibold">AI Financial Assistant</h2>
            </div>
            <Select defaultValue={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
                <SelectItem value="quarter">Past Quarter</SelectItem>
                <SelectItem value="year">Past Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Textarea
              placeholder="Ask a financial question or describe a goal, e.g., 'How can I save more effectively?' or 'What's my biggest spending category?'"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              className="resize-none"
            />
          </div>

          <div className="flex justify-end mb-6">
            <Button 
              onClick={handleGenerateAiInsight} 
              disabled={isAiLoading}
              className="flex items-center"
            >
              {isAiLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Generate Insight
                </>
              )}
            </Button>
          </div>

          {aiResponse && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg mb-4 animate-fade-in">
              <div className="flex">
                <Lightbulb className="text-primary flex-shrink-0 mt-1 mr-3" size={20} />
                <div>
                  <h3 className="font-medium mb-2">AI Financial Insight</h3>
                  <p className="text-sm">{aiResponse}</p>
                </div>
              </div>
            </div>
          )}

          {!user && (
            <div className="text-center py-3 bg-muted/50 rounded-lg text-sm">
              <p>Sign in to use the AI financial assistant</p>
            </div>
          )}
        </Card>
      </div>

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
          
          <Tabs defaultValue="chart">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart">
              <div className="text-center py-12 text-muted-foreground">
                <p className="mb-2">Expense breakdown visualization will appear here</p>
                <p className="text-sm">Track your expenses to see detailed insights</p>
              </div>
            </TabsContent>
            
            <TabsContent value="insights">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start">
                  <Brain className="text-primary flex-shrink-0 mt-1 mr-3" size={20} />
                  <div>
                    <h3 className="font-medium mb-2">Spending Pattern Analysis</h3>
                    <p className="text-sm">Your top spending categories are Housing (35%), Food (18%), and Transportation (15%). Your food expenses are 22% higher than similar households.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
          
          <Tabs defaultValue="chart">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart">
              <div className="text-center py-12 text-muted-foreground">
                <p className="mb-2">Income vs Expense chart will appear here</p>
                <p className="text-sm">Add income and expense transactions to generate the chart</p>
              </div>
            </TabsContent>
            
            <TabsContent value="trends">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start">
                  <ArrowUpRight className="text-green-500 flex-shrink-0 mt-1 mr-3" size={20} />
                  <div>
                    <h3 className="font-medium mb-2">Positive Saving Trend</h3>
                    <p className="text-sm">Your savings rate has increased by 8% over the last 3 months. At this rate, you'll reach your emergency fund goal 2 months ahead of schedule.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
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
        
        <div>
          <FinancialInsights />
        </div>
      </div>
    </div>
  );
};

export default Insights;
