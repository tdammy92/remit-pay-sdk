import type { Receiver, Sender } from './user.types';

export enum status {
  pending = 'pending',
  processing = 'prcessing',
  success = 'success',
  error = 'error',
}

export type Status = keyof typeof status;

export interface Transaction {
  id: string;
  status: Status;
  createdAt: Date | string;
  estimatedArrival: string;
  data: TransactionDetails;
}

export interface TransactionDetails {
  sender: Sender;
  receiver: Receiver;
  amount: Amount;
  reason?: string;
}

export interface Amount {
  sendAmount: number;
  sendCurrency: string;
  receiveCurrency: string;
  receiveAmount: number;
  exchangeRate: number;
  fees: number;
}

export interface TransactionError {
  code: string;
  message: string;
  details?: any;
}

export interface ExchangeRateResponse {
  rate: number;
  fees: number;
  receiveAmount: number;
  estimatedArrival: string;
}
