import { useState, useCallback } from 'react';
import { ApiService, RemittanceError } from '../services';
import type { Receiver, Sender } from '../types/user.types';
import type {
  Amount,
  ExchangeRateResponse,
  Transaction,
  TransactionDetails,
  TransactionError,
} from '../types/transaction.types';
import type { Step } from '../types';

export const usePay = (apiKey: string, testMode: boolean = true) => {
  const [currentStep, setCurrentStep] = useState<Step>('sender');
  const [senderDetails, setSenderDetails] = useState<Partial<Sender>>({});
  const [receiverDetails, setReceiverDetails] = useState<Partial<Receiver>>({});
  const [amountDetails, setAmountDetails] = useState<Partial<Amount>>({});
  const [reason, setReason] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TransactionError | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const apiService = new ApiService(apiKey, testMode);

  const nextStep = useCallback(() => {
    const steps: Step[] = [
      'sender',
      'receiver',
      'amount',
      'review',
      'processing',
      'success',
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]!);
    }
  }, [currentStep]);

  const previousStep = useCallback(() => {
    const steps: Step[] = ['sender', 'receiver', 'amount', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]!);
    }
  }, [currentStep]);

  const updateSenderDetails = useCallback((details: Partial<Sender>) => {
    setSenderDetails((prev) => ({ ...prev, ...details }));
  }, []);

  const updateReceiverDetails = useCallback((details: Partial<Receiver>) => {
    setReceiverDetails((prev) => ({ ...prev, ...details }));
  }, []);

  const calculateExchangeRate = useCallback(
    async (
      sendAmount: number,
      sendCurrency: string,
      receiveCurrency: string
    ): Promise<ExchangeRateResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiService.getExchangeRate(
          sendCurrency,
          receiveCurrency,
          sendAmount
        );
        setAmountDetails({
          sendAmount,
          sendCurrency,
          receiveAmount: response.receiveAmount,
          receiveCurrency,
          exchangeRate: response.rate,
          fees: response.fees,
        });
        return response;
      } catch (err) {
        const error =
          err instanceof RemittanceError
            ? err
            : new RemittanceError('UNKNOWN_ERROR', 'An unknown error occurred');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const submitRemittance = useCallback(async (): Promise<Transaction> => {
    setIsLoading(true);
    setError(null);
    setCurrentStep('processing');

    try {
      const remittanceData: TransactionDetails = {
        sender: senderDetails as Sender,
        receiver: receiverDetails as Receiver,
        amount: amountDetails as Amount,
        reason,
      };

      const result = await apiService.submitRemittance(remittanceData);
      setTransaction(result);
      setCurrentStep('success');
      return result;
    } catch (err) {
      const error =
        err instanceof RemittanceError
          ? err
          : new RemittanceError('UNKNOWN_ERROR', 'An unknown error occurred');
      setError(error);
      setCurrentStep('review');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [senderDetails, receiverDetails, amountDetails, reason]);

  const reset = useCallback(() => {
    setCurrentStep('sender');
    setSenderDetails({});
    setReceiverDetails({});
    setAmountDetails({});
    setReason('');
    setIsLoading(false);
    setError(null);
    setTransaction(null);
  }, []);

  return {
    currentStep,
    senderDetails,
    receiverDetails,
    amountDetails,
    reason,
    isLoading,
    error,
    transaction,
    nextStep,
    previousStep,
    updateSenderDetails,
    updateReceiverDetails,
    calculateExchangeRate,
    submitRemittance,
    reset,
    setReason,
  };
};
