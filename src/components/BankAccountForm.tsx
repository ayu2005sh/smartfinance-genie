
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useBankAccounts, NewBankAccount } from '@/hooks/useBankAccounts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { ShieldCheck } from 'lucide-react';

const bankAccountSchema = z.object({
  account_name: z.string().min(2, "Account name is required"),
  account_number: z.string().min(5, "Valid account number is required"),
  bank_name: z.string().min(2, "Bank name is required"),
  routing_number: z.string().min(9, "Valid routing number is required"),
  account_type: z.enum(["checking", "savings", "credit"]),
  is_primary: z.boolean().default(false),
});

type BankAccountFormValues = z.infer<typeof bankAccountSchema>;

interface BankAccountFormProps {
  onSuccess?: () => void;
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({ onSuccess }) => {
  const { addBankAccount } = useBankAccounts();
  
  const form = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      account_name: '',
      account_number: '',
      bank_name: '',
      routing_number: '',
      account_type: 'checking',
      is_primary: false,
    },
  });

  const onSubmit = async (data: BankAccountFormValues) => {
    await addBankAccount.mutateAsync(data as NewBankAccount);
    form.reset();
    if (onSuccess) onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bank_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bank name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="account_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="account_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter account name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="account_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter account number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="routing_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Routing Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter routing number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="is_primary"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 mt-1"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Set as default account</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Use this account for all transactions by default
                </p>
              </div>
            </FormItem>
          )}
        />

        <div className="bg-muted/50 p-3 rounded-md border border-border flex items-start gap-2 text-sm">
          <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <p>Your financial information is encrypted and secure. We use industry-standard security protocols to protect your data.</p>
        </div>

        <DialogFooter>
          <Button type="submit" className="w-full" disabled={addBankAccount.isPending}>
            {addBankAccount.isPending ? "Linking Account..." : "Link Bank Account"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default BankAccountForm;
