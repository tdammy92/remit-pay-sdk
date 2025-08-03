import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Step, Theme } from '../types';
import type { Receiver, Sender } from '../types/user.types';
import type {
  Amount,
  ExchangeRateResponse,
  Transaction,
  TransactionDetails,
  TransactionError,
} from '../types/transaction.types';
import { ApiService, RemittanceError } from '../services';
import { getTheme } from '../themes';
import { Alert } from 'react-native';

interface PayWidgtContextI {
  openPayBox: boolean;
  currentStep:
    | 'sender'
    | 'receiver'
    | 'amount'
    | 'review'
    | 'processing'
    | 'success';
  senderDetails: Partial<Sender>;
  receiverDetails: Partial<Receiver>;
  amountDetails: Partial<Amount>;
  reason: string;
  transaction: Transaction | null;
  error: TransactionError | null;
  isLoading: boolean;
  nextStep: () => void;
  previousStep: () => void;
  setReason: React.Dispatch<React.SetStateAction<string>>;
  updateSenderDetails: (details: Partial<Sender>) => void;
  updateReceiverDetails: (details: Partial<Receiver>) => void;
  calculateExchangeRate: (
    sendAmount: number,
    sendCurrency: string,
    receiveCurrency: string
  ) => Promise<ExchangeRateResponse>;
  submitRemittance: () => Promise<Transaction>;
  reset: () => void;
  openPayWidget: () => void;
  closePayWidget: () => void;
  closeWithing: () => void;
  theme: Theme;
  setTheme?: React.Dispatch<React.SetStateAction<Theme | undefined>>;
}

export const PayWidgtContext = createContext<PayWidgtContextI | null>(null);

export const usePayWidget = () => {
  const context = useContext(PayWidgtContext) as PayWidgtContextI;

  if (!context) {
    throw new Error(
      'you need to use this context withing a PayWidget provider to use this context'
    );
  }

  return context;
};

const PayWidgetProvider: React.FC<{
  children: React.ReactNode;
  apiKey: string;
  testMode?: boolean;
  customTheme?: 'light' | 'dark' | Theme;
}> = ({ children, apiKey, customTheme, testMode }) => {
  const [currentStep, setCurrentStep] = useState<Step>('sender');
  const [senderDetails, setSenderDetails] = useState<Partial<Sender>>({});
  const [receiverDetails, setReceiverDetails] = useState<Partial<Receiver>>({});
  const [amountDetails, setAmountDetails] = useState<Partial<Amount>>({});
  const [reason, setReason] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TransactionError | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [openPayBox, setOpenPayBox] = useState(false);
  const [theme, setTheme] = useState(() => getTheme(customTheme));

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

  const openPayWidget = () => {
    setOpenPayBox(true);
  };
  const closePayWidget = () => {
    setOpenPayBox(false);
  };

  const closeWithing = () => {
    Alert.alert('Close!', `Are you sure you want to close the Payment Box ?`, [
      {
        text: 'Cancle',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          reset();
          setOpenPayBox(false);
        },
      },
    ]);
  };

  useEffect(() => {
    const the = getTheme(customTheme);
    setTheme(the);
  }, [customTheme]);

  const values = useMemo(() => {
    return {
      theme,
      openPayBox,
      currentStep,
      senderDetails,
      receiverDetails,
      amountDetails,
      reason,
      transaction,
      error,
      isLoading,
      nextStep,
      setReason,
      previousStep,
      updateSenderDetails,
      updateReceiverDetails,
      calculateExchangeRate,
      submitRemittance,
      reset,
      setTheme,
      openPayWidget,
      closePayWidget,
      closeWithing,
    };
  }, [
    openPayBox,
    currentStep,
    senderDetails,
    receiverDetails,
    amountDetails,
    reason,
    transaction,
    error,
    isLoading,
    theme,
  ]) as PayWidgtContextI;
  return (
    <PayWidgtContext.Provider value={values}>
      {children}
    </PayWidgtContext.Provider>
  );
};

export default PayWidgetProvider;
