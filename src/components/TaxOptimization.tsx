
import React, { useState } from 'react';
import Card from '@/components/ui-custom/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { usePreferences } from '@/contexts/PreferencesContext';
import { formatCurrency } from '@/utils/formatCurrency';
import { BadgeIndianRupee, Calculator, ShieldCheck, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaxOptimizationProps {
  className?: string;
}

const TaxOptimization: React.FC<TaxOptimizationProps> = ({ className }) => {
  const { currency } = usePreferences();
  const { toast } = useToast();
  const [income, setIncome] = useState<number>(1500000);
  const [age, setAge] = useState<string>("below60");
  const [regime, setRegime] = useState<string>("new");
  const [investments, setInvestments] = useState<number>(150000);
  const [savings, setSavings] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [optimizedTax, setOptimizedTax] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Tax calculation for India
  const calculateTax = () => {
    let taxableIncome = income;
    let finalTax = 0;
    let potentialSavings = 0;

    // Calculate tax according to regime
    if (regime === "new") {
      // New tax regime calculation
      if (taxableIncome <= 300000) {
        finalTax = 0;
      } else if (taxableIncome <= 600000) {
        finalTax = (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 900000) {
        finalTax = 15000 + (taxableIncome - 600000) * 0.1;
      } else if (taxableIncome <= 1200000) {
        finalTax = 45000 + (taxableIncome - 900000) * 0.15;
      } else if (taxableIncome <= 1500000) {
        finalTax = 90000 + (taxableIncome - 1200000) * 0.2;
      } else {
        finalTax = 150000 + (taxableIncome - 1500000) * 0.3;
      }
      
      // Calculate old regime with optimal investments for comparison
      let oldRegimeTaxable = Math.max(income - 150000 - 50000, 0); // Standard deduction + optimal 80C
      let oldRegimeTax = 0;

      if (oldRegimeTaxable <= 250000) {
        oldRegimeTax = 0;
      } else if (oldRegimeTaxable <= 500000) {
        oldRegimeTax = (oldRegimeTaxable - 250000) * 0.05;
      } else if (oldRegimeTaxable <= 1000000) {
        oldRegimeTax = 12500 + (oldRegimeTaxable - 500000) * 0.2;
      } else {
        oldRegimeTax = 112500 + (oldRegimeTaxable - 1000000) * 0.3;
      }

      // Add cess
      oldRegimeTax = oldRegimeTax * 1.04;

      potentialSavings = Math.max(finalTax - oldRegimeTax, 0);
      if (potentialSavings > 0) {
        setOptimizedTax(oldRegimeTax);
      } else {
        setOptimizedTax(finalTax);
        potentialSavings = 0;
      }
    } else {
      // Old tax regime calculation
      // Apply standard deduction
      taxableIncome -= 50000;
      
      // Apply investment deductions (like 80C)
      taxableIncome -= Math.min(investments, 150000);
      
      if (taxableIncome <= 250000) {
        finalTax = 0;
      } else if (taxableIncome <= 500000) {
        finalTax = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        finalTax = 12500 + (taxableIncome - 500000) * 0.2;
      } else {
        finalTax = 112500 + (taxableIncome - 1000000) * 0.3;
      }
      
      // Calculate potential savings with additional optimal investments
      const potentialInvestment = Math.min(150000 - investments, Math.max(0, income - investments - 50000 - 250000));
      if (potentialInvestment > 0) {
        const optimizedTaxableIncome = taxableIncome - potentialInvestment;
        let optimizedTaxAmount = 0;
        
        if (optimizedTaxableIncome <= 250000) {
          optimizedTaxAmount = 0;
        } else if (optimizedTaxableIncome <= 500000) {
          optimizedTaxAmount = (optimizedTaxableIncome - 250000) * 0.05;
        } else if (optimizedTaxableIncome <= 1000000) {
          optimizedTaxAmount = 12500 + (optimizedTaxableIncome - 500000) * 0.2;
        } else {
          optimizedTaxAmount = 112500 + (optimizedTaxableIncome - 1000000) * 0.3;
        }
        
        // Add cess
        optimizedTaxAmount = optimizedTaxAmount * 1.04;
        
        potentialSavings = finalTax * 1.04 - optimizedTaxAmount;
        setOptimizedTax(optimizedTaxAmount);
      } else {
        // Add cess
        finalTax = finalTax * 1.04;
        setOptimizedTax(finalTax);
      }
    }

    // Add cess (4%) for health and education
    finalTax = finalTax * 1.04;
    
    setTaxAmount(finalTax);
    setSavings(potentialSavings);
    setShowResults(true);
    
    toast({
      title: "Tax Calculation Complete",
      description: "Your tax details have been calculated."
    });
  };

  return (
    <Card variant="glass" className={cn('', className)}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <BadgeIndianRupee className="mr-2 text-primary" size={20} />
          <h2 className="text-xl font-semibold">Tax Optimization</h2>
        </div>
        <Button variant="ghost" size="icon" title="Download tax report">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="income">Annual Income</Label>
          <div className="relative">
            <Input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="pl-8"
            />
            <div className="absolute left-3 top-2.5 text-muted-foreground">₹</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age Group</Label>
            <Select value={age} onValueChange={setAge}>
              <SelectTrigger id="age">
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="below60">Below 60 years</SelectItem>
                <SelectItem value="60to80">60 - 80 years</SelectItem>
                <SelectItem value="above80">Above 80 years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="regime">Tax Regime</Label>
            <Select value={regime} onValueChange={setRegime}>
              <SelectTrigger id="regime">
                <SelectValue placeholder="Select tax regime" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Regime</SelectItem>
                <SelectItem value="old">Old Regime</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {regime === "old" && (
          <div className="space-y-2">
            <Label htmlFor="investments">Section 80C Investments</Label>
            <div className="relative">
              <Input
                id="investments"
                type="number"
                value={investments}
                onChange={(e) => setInvestments(Number(e.target.value))}
                className="pl-8"
                max={150000}
              />
              <div className="absolute left-3 top-2.5 text-muted-foreground">₹</div>
            </div>
            <p className="text-xs text-muted-foreground">Maximum deduction: ₹1,50,000</p>
          </div>
        )}

        <Button 
          onClick={calculateTax}
          className="w-full"
          variant="default"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Tax
        </Button>

        {showResults && (
          <div className="space-y-4 animate-fade-in mt-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estimated Tax</p>
                  <p className="text-2xl font-semibold">{formatCurrency(taxAmount, currency)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Optimized Tax</p>
                  <p className="text-2xl font-semibold text-green-600">{formatCurrency(optimizedTax, currency)}</p>
                </div>
              </div>
            </div>
            
            {savings > 0 && (
              <div className="flex bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                <ShieldCheck className="text-green-600 flex-shrink-0 mt-0.5 mr-2" size={18} />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-300">Potential Savings</p>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    You could save up to {formatCurrency(savings, currency)} by {regime === 'new' ? 'switching to the old regime and utilizing deductions' : 'maximizing your Section 80C investments'}
                  </p>
                </div>
              </div>
            )}

            <div>
              <p className="font-medium">Tax Optimization Tips:</p>
              <ul className="text-sm text-muted-foreground list-disc pl-5 mt-1 space-y-1">
                <li>Consider investing in ELSS funds for tax benefits under Section 80C</li>
                <li>Maximize your NPS contribution for additional tax benefits</li>
                <li>Health insurance premiums qualify for deductions under Section 80D</li>
                <li>Home loan interest can be claimed as deduction under Section 24</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaxOptimization;
