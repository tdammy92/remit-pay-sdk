import type { Transaction, TransactionError } from './transaction.types';

export interface RemitWidgetProps {
  apiKey: string;
  onSuccess: (transaction: Transaction) => void;
  onError: (error: TransactionError) => void;
  onCancel?: () => void;
  theme?: 'light' | 'dark' | Theme;
  defaultSendCurrency?: string;
  defaultReceiveCurrency?: string;
  enabledCountries?: string[];
  testMode?: boolean;
}

export interface Theme {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  errorColor: string;
  successColor: string;
  cardBackgroundColor: string;
  buttonTextColor: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const steps = {
  sender: 'sender',
  receiver: 'receiver',
  amount: 'amount',
  review: 'review',
  processing: 'processing',
  success: 'success',
};

export type Step = keyof typeof steps;

export type { Transaction, TransactionError };
