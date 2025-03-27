
import React, { useState } from 'react';
import Card from '@/components/ui-custom/Card';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Check, 
  PiggyBank, 
  Lightbulb,
  RefreshCw, 
  Maximize, 
  X 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useTransactions } from '@/hooks/useTransactions';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';

interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'tip' | 'alert' | 'achievement' | 'prediction';
  action?: string;
  details?: string;
}

interface FinancialInsightsProps {
  className?: string;
}

const FinancialInsights: React.FC<FinancialInsightsProps> = ({ className }) => {
  const { toast } = useToast();
  const { transactions } = useTransactions();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample insights - in a real app, these would be generated based on user data
  const staticInsights: Insight[] = [
    {
      id: '1',
      title: 'Save on dining expenses',
      description: 'You spent 30% more on restaurants this month compared to your average. Consider cooking at home more often.',
      type: 'tip',
      action: 'View Details',
      details: 'Your restaurant spending this month is $420, compared to your average of $320. At this rate, you could exceed your monthly budget by $300. Consider meal prepping on weekends or using grocery delivery services to save time and money.'
    },
    {
      id: '2',
      title: 'Unusual transaction detected',
      description: 'We noticed a transaction of $89.99 that doesn\'t match your usual spending pattern.',
      type: 'alert',
      action: 'Review',
      details: 'This transaction occurred on Tuesday at an online retailer you haven\'t used before. If this was not authorized by you, consider freezing your card and contacting your bank immediately.'
    },
    {
      id: '3',
      title: 'Budget goal achieved',
      description: 'Congratulations! You stayed under your shopping budget for 3 consecutive months.',
      type: 'achievement',
      details: 'You\'ve consistently kept your shopping expenses under $200 per month for the last quarter. This is helping you save approximately $150 monthly compared to your previous spending habits.'
    },
    {
      id: '4',
      title: 'Smart investment opportunity',
      description: 'Based on your current savings rate, you could invest an additional $200 monthly towards retirement.',
      type: 'prediction',
      action: 'Explore Options',
      details: 'If you invest an additional $200 monthly with an average annual return of 7%, you could accumulate approximately $120,000 more in retirement savings over the next 20 years.'
    }
  ];

  const [insights, setInsights] = useState<Insight[]>(staticInsights);

  const refreshInsights = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to get personalized insights",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // In a real app, we would call an API to generate insights based on user data
      // For now, we'll just shuffle our static insights and add a new one
      
      const updatedInsights = [...staticInsights];
      
      // Add a fresh insight based on transactions (if available)
      if (transactions && transactions.length > 0) {
        const categories = transactions.map(t => t.category);
        const mostFrequentCategory = categories.sort((a, b) => 
          categories.filter(v => v === a).length - categories.filter(v => v === b).length
        ).pop();
        
        updatedInsights.push({
          id: `dynamic-${Date.now()}`,
          title: `${mostFrequentCategory} category trend detected`,
          description: `You've been spending consistently on ${mostFrequentCategory}. We've identified potential savings opportunities.`,
          type: 'prediction',
          action: 'See Analysis',
          details: `Your ${mostFrequentCategory} spending accounts for approximately ${Math.floor(Math.random() * 30) + 20}% of your total expenses. Consider reviewing these transactions to identify potential savings.`
        });
      }
      
      // Shuffle and take 4-5 insights
      const shuffled = updatedInsights.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(5, shuffled.length));
      
      setInsights(selected);
      setIsLoading(false);
      
      toast({
        title: "Insights Updated",
        description: "Your financial insights have been refreshed"
      });
    }, 1500);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="text-primary" size={20} />;
      case 'alert':
        return <AlertTriangle className="text-amber-500" size={20} />;
      case 'achievement':
        return <Check className="text-green-500" size={20} />;
      case 'prediction':
        return <TrendingUp className="text-indigo-500" size={20} />;
      default:
        return <Sparkles className="text-primary" size={20} />;
    }
  };

  const getInsightBgColor = (type: string) => {
    switch (type) {
      case 'tip':
        return 'bg-primary/5 border-primary/20';
      case 'alert':
        return 'bg-amber-500/5 border-amber-500/20';
      case 'achievement':
        return 'bg-green-500/5 border-green-500/20';
      case 'prediction':
        return 'bg-indigo-500/5 border-indigo-500/20';
      default:
        return 'bg-primary/5 border-primary/20';
    }
  };

  const viewInsightDetails = (insight: Insight) => {
    setSelectedInsight(insight);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card variant="glass" className={cn('', className)}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Sparkles className="mr-2 text-primary" size={20} />
            <h2 className="text-xl font-semibold">AI Financial Insights</h2>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshInsights}
            disabled={isLoading}
            className="flex items-center"
          >
            <RefreshCw className={cn("h-4 w-4 mr-1", isLoading && "animate-spin")} />
            {isLoading ? "Analyzing..." : "Refresh"}
          </Button>
        </div>

        <div className="space-y-4">
          {insights.length > 0 ? (
            insights.map((insight, index) => (
              <div 
                key={insight.id}
                className={cn(
                  'p-4 rounded-lg border animate-fade-in',
                  getInsightBgColor(insight.type)
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                    {insight.action && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => viewInsightDetails(insight)}
                      >
                        {insight.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <PiggyBank className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No insights available yet</p>
              <p className="text-sm mt-1">Track your finances to generate personalized insights</p>
            </div>
          )}
        </div>
        
        {!user && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm text-center">
            <p>Sign in to get personalized financial insights powered by AI</p>
          </div>
        )}
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedInsight && getInsightIcon(selectedInsight.type)}
              <span className="ml-2">{selectedInsight?.title}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedInsight?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className={cn(
            "p-4 rounded-lg border mt-2",
            selectedInsight && getInsightBgColor(selectedInsight.type)
          )}>
            <p className="text-sm">{selectedInsight?.details}</p>
          </div>
          
          <div className="flex justify-end mt-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinancialInsights;
