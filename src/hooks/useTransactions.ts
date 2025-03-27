
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description?: string;
  transaction_date: string;
  user_id: string;
  currency: string;
}

export const useTransactions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch transactions
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('transaction_date', { ascending: false });
        
      if (error) throw error;
      return data as Transaction[];
    },
    enabled: !!user,
  });
  
  // Add transaction
  const addTransaction = useMutation({
    mutationFn: async (newTransaction: Omit<Transaction, 'id' | 'user_id'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('transactions')
        .insert([{
          ...newTransaction,
          user_id: user.id,
        }])
        .select();
        
      if (error) throw error;
      return data[0] as Transaction;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', user?.id] });
      toast({
        title: 'Transaction Added',
        description: 'Your transaction has been recorded',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error Adding Transaction',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Update transaction
  const updateTransaction = useMutation({
    mutationFn: async (updatedTransaction: Partial<Transaction> & { id: string }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('transactions')
        .update(updatedTransaction)
        .eq('id', updatedTransaction.id)
        .eq('user_id', user.id)
        .select();
        
      if (error) throw error;
      return data[0] as Transaction;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', user?.id] });
      toast({
        title: 'Transaction Updated',
        description: 'Your transaction has been updated',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error Updating Transaction',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Delete transaction
  const deleteTransaction = useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', user?.id] });
      toast({
        title: 'Transaction Deleted',
        description: 'Your transaction has been removed',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error Deleting Transaction',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  return {
    transactions,
    isLoading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
