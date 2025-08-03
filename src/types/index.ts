import type { Transaction, TransactionError } from './transaction.types';

export interface RemitWidgetProps {
  apiKey: string;
  onSuccess: (transaction: Transaction) => void;
  onError: (error: TransactionError) => void;
  onCancel?: () => void;
  customTheme?: 'light' | 'dark' | Theme;
  defaultSendCurrency?: string;
  defaultReceiveCurrency?: string;
  enabledCountries?: string[];
  testMode?: boolean;
  openPayWidget?: (params?: WidgetOpenParams) => void;
  closePayWidget?: (params?: WidgetCloseParams) => void;
}

export type WidgetAction = {
  openPayWidget: () => void;
  closePayWidget: () => void;
};

export type WidgetOpenParams = RemitWidgetProps & WidgetAction;
export type WidgetCloseParams = void;

export type WidgetActionRef = {
  openPayWidget: (params?: WidgetOpenParams) => void;
  closePayWidget: (params?: WidgetCloseParams) => void;
};

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
