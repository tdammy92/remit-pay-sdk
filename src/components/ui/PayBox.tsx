import { useEffect, type FC } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { usePayWidget } from '../../context';
import type { RemitWidgetProps } from '../../types';
import { AmountForm } from '../forms/AmountForm';
import { ReceiverForm } from '../forms/ReceiverForm';
import { ReviewForm } from '../forms/ReviewForm';
import { SenderForm } from '../forms/SenderForm';
import { LoadingSpinner } from '../loaders/LoadingSpinner';
import { SuccessScreen } from './SuccessScreen';
import WidgetFooter from './WidgetFooter';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const PayBox: FC<RemitWidgetProps> = ({
  onSuccess,
  onError,
  onCancel,
  defaultSendCurrency = 'USD',
  defaultReceiveCurrency = 'NGN',
}) => {
  const {
    currentStep,
    senderDetails,
    receiverDetails,
    amountDetails,
    reason,
    isLoading,
    error,
    theme,
    transaction,
    nextStep,
    previousStep,
    updateSenderDetails,
    updateReceiverDetails,
    calculateExchangeRate,
    submitRemittance,
    reset,
    setReason,
  } = usePayWidget();

  useEffect(() => {
    if (error) {
      onError(error);
    }
  }, [error, onError]);

  useEffect(() => {
    if (transaction && currentStep === 'success') {
      onSuccess(transaction);
    }
  }, [transaction, currentStep, onSuccess]);

  const handleSubmitRemittance = async () => {
    try {
      await submitRemittance();
    } catch (err) {
      // Error is already handled in the hook
    }
  };

  const handleClose = () => {
    reset();
    onCancel?.();
  };

  const handleStartNew = () => {
    reset();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'sender':
        return (
          <SenderForm
            senderDetails={senderDetails}
            onUpdateSender={updateSenderDetails}
            onNext={nextStep}
          />
        );

      case 'receiver':
        return (
          <ReceiverForm
            receiverDetails={receiverDetails}
            onUpdateReceiver={updateReceiverDetails}
            onNext={nextStep}
            onBack={previousStep}
          />
        );

      case 'amount':
        return (
          <AmountForm
            sendAmount={amountDetails.sendAmount || 0}
            sendCurrency={amountDetails.sendCurrency || defaultSendCurrency}
            receiveCurrency={
              amountDetails.receiveCurrency || defaultReceiveCurrency
            }
            onCalculateRate={calculateExchangeRate}
            onNext={nextStep}
            onBack={previousStep}
            isLoading={isLoading}
          />
        );

      case 'review':
        return (
          <ReviewForm
            senderDetails={senderDetails as any}
            receiverDetails={receiverDetails as any}
            amountDetails={amountDetails as any}
            reason={reason}
            onSubmit={handleSubmitRemittance}
            onBack={previousStep}
            onUpdateReason={setReason}
            isLoading={isLoading}
          />
        );

      case 'processing':
        return (
          <>
            <LoadingSpinner message="Processing your transfer..." />
          </>
        );

      case 'success':
        return transaction ? (
          <SuccessScreen
            transaction={transaction}
            onClose={handleClose}
            onStartNew={handleStartNew}
          />
        ) : null;

      default:
        return null;
    }
  };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme?.backgroundColor }]}
    >
      <View
        style={[styles.container, { backgroundColor: theme?.backgroundColor }]}
      >
        {renderCurrentStep()}
        <WidgetFooter />
      </View>
    </SafeAreaView>
  );
};

export default PayBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999, // Ensure it's always on top
    elevation: 9999, // For Android
    paddingTop: SCREEN_HEIGHT * 0.1,
    paddingBottom: SCREEN_HEIGHT * 0.1,
  },
});
