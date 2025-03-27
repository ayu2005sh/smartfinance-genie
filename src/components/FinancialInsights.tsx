
import React from 'react';
import Card from '@/components/ui-custom/Card';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, AlertTriangle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'tip' | 'alert' | 'achievement';
  action?: string;
}

interface FinancialInsightsProps {
  className?: string;
}

const FinancialInsights: React.FC<FinancialInsightsProps> = ({ className }) => {
  const insights: Insight[] = [
    {
      id: '1',
      title: 'Save on dining expenses',
      description: 'You spent 30% more on restaurants this month compared to your average. Consider cooking at home more often.',
      type: 'tip',
      action: 'View Details'
    },
    {
      id: '2',
      title: 'Unusual transaction detected',
      description: 'We noticed a transaction of $89.99 that doesn\'t match your usual spending pattern.',
      type: 'alert',
      action: 'Review'
    },
    {
      id: '3',
      title: 'Budget goal achieved',
      description: 'Congratulations! You stayed under your shopping budget for 3 consecutive months.',
      type: 'achievement'
    },
    {
      id: '4',
      title: 'Investment opportunity',
      description: 'Based on your savings rate, you could invest an additional $200 monthly towards retirement.',
      type: 'tip',
      action: 'Explore Options'
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'tip':
        return <TrendingUp className="text-primary" size={20} />;
      case 'alert':
        return <AlertTriangle className="text-amber-500" size={20} />;
      case 'achievement':
        return <Check className="text-green-500" size={20} />;
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
      default:
        return 'bg-primary/5 border-primary/20';
    }
  };

  return (
    <Card variant="glass" className={cn('', className)}>
      <div className="flex items-center mb-6">
        <Sparkles className="mr-2 text-primary" size={20} />
        <h2 className="text-xl font-semibold">AI Financial Insights</h2>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
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
                  <Button variant="outline" size="sm">
                    {insight.action}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FinancialInsights;
