import type {
  ExchangeRateResponse,
  Transaction,
  TransactionDetails,
} from '../types/transaction.types';
import { mockExchangeRates } from '../utils/xchange-rate';

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class ApiService {
  private apiKey: string;
  // private baseUrl: string;
  private testMode: boolean;

  constructor(apiKey: string, testMode: boolean = true) {
    this.apiKey = apiKey;
    this.testMode = testMode;
    // this.baseUrl = testMode
    //   ? 'https://api-sandbox.afriex.com'
    //   : 'https://api.afriex.com';
  }

  async getExchangeRate(
    fromCurrency: string,
    toCurrency: string,
    amount: number
  ): Promise<ExchangeRateResponse> {
    await delay(1000); // Simulate API delay

    // Mock validation
    if (!this.apiKey || !TESTKEYS.includes(this.apiKey)) {
      throw new RemittanceError('INVALID_API_KEY', 'Invalid API key provided');
    }

    const rate = mockExchangeRates[fromCurrency]?.[toCurrency];
    if (!rate) {
      throw new RemittanceError(
        'UNSUPPORTED_CURRENCY_PAIR',
        `Exchange rate not available for ${fromCurrency} to ${toCurrency}`
      );
    }

    const fees = amount * 0.025; // 2.5% fee
    const receiveAmount = (amount - fees) * rate;

    return {
      rate,
      fees,
      receiveAmount,
      estimatedArrival: this.calculateEstimatedArrival(),
    };
  }

  async submitRemittance(data: TransactionDetails): Promise<Transaction> {
    await delay(2000); // Simulate processing time

    // Mock validation
    if (!this.apiKey || this.apiKey === 'invalid-key') {
      throw new RemittanceError('INVALID_API_KEY', 'Invalid API key provided');
    }

    // Simulate random failures in test mode
    if (this.testMode && Math.random() < 0.1) {
      throw new RemittanceError(
        'TRANSACTION_FAILED',
        'Transaction failed due to insufficient funds or bank restrictions'
      );
    }

    const transaction: Transaction = {
      id: this.generateTransactionId(),
      status: 'processing',
      createdAt: new Date().toISOString(),
      estimatedArrival: this.calculateEstimatedArrival(),
      //  tid: this.generateTrackingNumber(),
      data,
    };

    return transaction;
  }

  async getTransactionStatus(): Promise<Transaction['status']> {
    await delay(500);

    // Mock status progression
    const statuses: Transaction['status'][] = ['processing', 'success'];

    return statuses[Math.floor(Math.random() * statuses?.length)]!;
  }

  private generateTransactionId(): string {
    return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }

  private calculateEstimatedArrival(): string {
    const now = new Date();
    const arrivalDate = new Date(
      now.getTime() + (1 + Math.random() * 2) * 24 * 60 * 60 * 1000
    );
    return arrivalDate.toISOString();
  }
}

export class RemittanceError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'RemittanceError';
  }
}
//for test simulation
const TESTKEYS = ['1GH34535453', '54545SDFDFD', '3244354535'];
