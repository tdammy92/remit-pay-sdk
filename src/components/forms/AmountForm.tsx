import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import type { ExchangeRateResponse } from '../../types/transaction.types';
import type { Theme } from '../../types';
import { validateAmount } from '../../utils/validation-helper';

interface AmountFormProps {
  sendAmount: number;
  sendCurrency: string;
  receiveCurrency: string;
  onCalculateRate: (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => Promise<ExchangeRateResponse>;
  onNext: () => void;
  onBack: () => void;
  theme: Theme;
  isLoading: boolean;
}

export const AmountForm: React.FC<AmountFormProps> = ({
  sendAmount,
  sendCurrency,
  receiveCurrency,
  onCalculateRate,
  onNext,
  onBack,
  theme,
  isLoading,
}) => {
  const [amount, setAmount] = useState(sendAmount?.toString() || '');
  const [fromCurrency, setFromCurrency] = useState(sendCurrency || 'USD');
  const [toCurrency, setToCurrency] = useState(receiveCurrency || 'NGN');
  const [exchangeData, setExchangeData] = useState<ExchangeRateResponse | null>(
    null
  );
  const [error, setError] = useState<string>('');
  const [calculating, setCalculating] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'NGN', 'GHS', 'KES', 'UGX'];

  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      calculateRate();
    }
  }, [amount, fromCurrency, toCurrency]);

  const calculateRate = async () => {
    const numAmount = parseFloat(amount);
    const validationError = validateAmount(numAmount);

    if (validationError) {
      setError(validationError);
      setExchangeData(null);
      return;
    }

    setError('');
    setCalculating(true);

    try {
      const response = await onCalculateRate(
        numAmount,
        fromCurrency,
        toCurrency
      );
      setExchangeData(response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to calculate exchange rate'
      );
      setExchangeData(null);
    } finally {
      setCalculating(false);
    }
  };

  const handleNext = () => {
    if (!exchangeData || error) {
      return;
    }
    onNext();
  };

  const inputStyle = [
    styles.input,
    {
      backgroundColor: theme.cardBackgroundColor,
      borderColor: theme.borderColor,
      color: theme.textColor,
    },
  ];

  const errorInputStyle = [...inputStyle, { borderColor: theme.errorColor }];

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.textColor }]}>
          Send Money
        </Text>

        <Text style={[styles.label, { color: theme.textColor }]}>You Send</Text>
        <View style={styles.amountRow}>
          <TextInput
            style={[error ? errorInputStyle : inputStyle, styles.amountInput]}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            placeholderTextColor={theme.textColor + '80'}
            keyboardType="numeric"
          />
          <View
            style={[
              styles.currencyPicker,
              {
                backgroundColor: theme.cardBackgroundColor,
                borderColor: theme.borderColor,
              },
            ]}
          >
            <Text style={[styles.currencyText, { color: theme.textColor }]}>
              {fromCurrency}
            </Text>
          </View>
        </View>
        {error && (
          <Text style={[styles.errorText, { color: theme.errorColor }]}>
            {error}
          </Text>
        )}

        <Text style={[styles.label, { color: theme.textColor }]}>
          Recipient Gets
        </Text>
        <View style={styles.amountRow}>
          <View
            style={[
              styles.receiveAmountContainer,
              {
                backgroundColor: theme.cardBackgroundColor,
                borderColor: theme.borderColor,
              },
            ]}
          >
            {calculating ? (
              <ActivityIndicator size="small" color={theme.primaryColor} />
            ) : (
              <Text style={[styles.receiveAmount, { color: theme.textColor }]}>
                {exchangeData ? exchangeData.receiveAmount.toFixed(2) : '0.00'}
              </Text>
            )}
          </View>
          <View
            style={[
              styles.currencyPicker,
              {
                backgroundColor: theme.cardBackgroundColor,
                borderColor: theme.borderColor,
              },
            ]}
          >
            <Text style={[styles.currencyText, { color: theme.textColor }]}>
              {toCurrency}
            </Text>
          </View>
        </View>

        {exchangeData && (
          <View
            style={[
              styles.rateCard,
              { backgroundColor: theme.cardBackgroundColor },
            ]}
          >
            <Text style={[styles.rateTitle, { color: theme.textColor }]}>
              Exchange Rate Details
            </Text>
            <View style={styles.rateRow}>
              <Text
                style={[styles.rateLabel, { color: theme.textColor + 'CC' }]}
              >
                Exchange Rate:
              </Text>
              <Text style={[styles.rateValue, { color: theme.textColor }]}>
                1 {fromCurrency} = {exchangeData.rate} {toCurrency}
              </Text>
            </View>
            <View style={styles.rateRow}>
              <Text
                style={[styles.rateLabel, { color: theme.textColor + 'CC' }]}
              >
                Transfer Fee:
              </Text>
              <Text style={[styles.rateValue, { color: theme.textColor }]}>
                {exchangeData.fees.toFixed(2)} {fromCurrency}
              </Text>
            </View>
            <View style={styles.rateRow}>
              <Text
                style={[styles.rateLabel, { color: theme.textColor + 'CC' }]}
              >
                Estimated Arrival:
              </Text>
              <Text style={[styles.rateValue, { color: theme.textColor }]}>
                {new Date(exchangeData.estimatedArrival).toLocaleDateString()}
              </Text>
            </View>
          </View>
        )}

        <Text style={[styles.currencySectionTitle, { color: theme.textColor }]}>
          Change Currencies
        </Text>

        <Text style={[styles.label, { color: theme.textColor }]}>
          Send From
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.currencyList}
        >
          {currencies.map((currency) => (
            <TouchableOpacity
              key={`send-${currency}`}
              style={[
                styles.currencyOption,
                {
                  backgroundColor:
                    fromCurrency === currency
                      ? theme.primaryColor
                      : theme.cardBackgroundColor,
                  borderColor: theme.borderColor,
                },
              ]}
              onPress={() => setFromCurrency(currency)}
            >
              <Text
                style={[
                  styles.currencyOptionText,
                  {
                    color:
                      fromCurrency === currency
                        ? theme.buttonTextColor
                        : theme.textColor,
                  },
                ]}
              >
                {currency}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={[styles.label, { color: theme.textColor }]}>Send To</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.currencyList}
        >
          {currencies.map((currency) => (
            <TouchableOpacity
              key={`receive-${currency}`}
              style={[
                styles.currencyOption,
                {
                  backgroundColor:
                    toCurrency === currency
                      ? theme.primaryColor
                      : theme.cardBackgroundColor,
                  borderColor: theme.borderColor,
                },
              ]}
              onPress={() => setToCurrency(currency)}
            >
              <Text
                style={[
                  styles.currencyOptionText,
                  {
                    color:
                      toCurrency === currency
                        ? theme.buttonTextColor
                        : theme.textColor,
                  },
                ]}
              >
                {currency}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.backButton, { borderColor: theme.borderColor }]}
          onPress={onBack}
        >
          <Text style={[styles.backButtonText, { color: theme.textColor }]}>
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                exchangeData && !error ? theme.primaryColor : theme.borderColor,
            },
          ]}
          onPress={handleNext}
          disabled={!exchangeData || !!error || calculating}
        >
          <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInput: {
    flex: 1,
    marginRight: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  currencyPicker: {
    width: 80,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 16,
    fontWeight: '600',
  },
  receiveAmountContainer: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginRight: 12,
  },
  receiveAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
  rateCard: {
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  rateTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rateLabel: {
    fontSize: 14,
  },
  rateValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  currencySectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },
  currencyList: {
    marginBottom: 8,
  },
  currencyOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  currencyOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 0.65,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    flex: 0.3,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
