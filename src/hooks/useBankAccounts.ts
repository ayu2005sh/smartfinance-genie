
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface BankAccount {
  id: string;
  account_name: string;
  account_number: string;
  bank_name: string;
  routing_number: string;
  account_type: string;
  is_primary: boolean;
  created_at: string;
  user_id: string;
}

export type NewBankAccount = Omit<BankAccount, 'id' | 'created_at' | 'user_id'>;

export const useBankAccounts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch bank accounts
  const { data: bankAccounts, isLoading, error } = useQuery({
    queryKey: ['bankAccounts', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('bank_accounts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as BankAccount[];
    },
    enabled: !!user,
  });
  
  // Add bank account
  const addBankAccount = useMutation({
    mutationFn: async (newAccount: NewBankAccount) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('bank_accounts')
        .insert([{
          ...newAccount,
          user_id: user.id,
        }])
        .select();
        
      if (error) throw error;
      return data[0] as BankAccount;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankAccounts', user?.id] });
      toast({
        title: 'Bank Account Linked',
        description: 'Your bank account has been successfully connected',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error Linking Account',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Set primary bank account
  const setPrimaryAccount = useMutation({
    mutationFn: async (accountId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      // First, set all accounts to non-primary
      await supabase
        .from('bank_accounts')
        .update({ is_primary: false })
        .eq('user_id', user.id);
        
      // Then, set the selected account as primary
      const { data, error } = await supabase
        .from('bank_accounts')
        .update({ is_primary: true })
        .eq('id', accountId)
        .eq('user_id', user.id)
        .select();
        
      if (error) throw error;
      return data[0] as BankAccount;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankAccounts', user?.id] });
      toast({
        title: 'Default Account Updated',
        description: 'Your default bank account has been updated',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error Updating Default Account',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Delete bank account
  const deleteBankAccount = useMutation({
    mutationFn: async (accountId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('bank_accounts')
        .delete()
        .eq('id', accountId)
        .eq('user_id', user.id);
        
      if (error) throw error;
      return accountId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankAccounts', user?.id] });
      toast({
        title: 'Bank Account Removed',
        description: 'Your bank account has been removed',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error Removing Account',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  return {
    bankAccounts,
    isLoading,
    error,
    addBankAccount,
    setPrimaryAccount,
    deleteBankAccount,
  };
};
