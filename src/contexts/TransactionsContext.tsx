import { ReactNode, useCallback, useState, useEffect } from 'react';
import { createContext } from 'use-context-selector';
import { api } from '../lib/axios';

interface ITransaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createdAt: string;
}

interface ITransactionDTO {
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
}

interface TransactionsContextType {
  transactions: ITransaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: ITransactionDTO) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsProvider = ({
  children
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'desc'
      }
    });

    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback(async (data: ITransactionDTO) => {
    const { description, price, category, type } = data;
    const createdAt = new Date().toISOString();
    const response = await api.post('/transactions', {
      description,
      price,
      category,
      type,
      createdAt
    });
    setTransactions((prevState) => [response.data, ...prevState]);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, fetchTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
