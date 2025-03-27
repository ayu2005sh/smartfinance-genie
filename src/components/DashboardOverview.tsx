
import React from 'react';
import Card from '@/components/ui-custom/Card';
import AnimatedNumber from '@/components/AnimatedNumber';
import { ArrowUp, ArrowDown, DollarSign, Wallet, CreditCard, PiggyBank } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardOverviewProps {
  className?: string;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ className }) => {
  const overviewData = [
    {
      title: 'Total Balance',
      amount: 12450.90,
      change: 8.2,
      isPositive: true,
      icon: <DollarSign className="text-primary" size={24} />,
    },
    {
      title: 'Monthly Income',
      amount: 8230.50,
      change: 12.5,
      isPositive: true,
      icon: <Wallet className="text-green-500" size={24} />,
    },
    {
      title: 'Monthly Expenses',
      amount: 4120.30,
      change: 3.2,
      isPositive: false,
      icon: <CreditCard className="text-amber-500" size={24} />,
    },
    {
      title: 'Savings',
      amount: 2560.80,
      change: 15.3,
      isPositive: true,
      icon: <PiggyBank className="text-indigo-500" size={24} />,
    },
  ];

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {overviewData.map((item, index) => (
        <Card
          key={index}
          variant="glass"
          className="relative overflow-hidden"
          animation={`fade-in`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            {item.icon}
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-muted-foreground font-medium mb-1">{item.title}</h3>
              <div className="text-2xl font-semibold">
                <AnimatedNumber
                  value={item.amount}
                  prefix="$"
                  decimals={2}
                />
              </div>
            </div>
            <div>
              {item.icon}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={cn(
              'inline-flex items-center text-sm font-medium mr-2',
              item.isPositive ? 'text-green-500' : 'text-red-500'
            )}>
              {item.isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              <AnimatedNumber
                value={item.change}
                suffix="%"
                decimals={1}
                className="ml-1"
              />
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardOverview;
