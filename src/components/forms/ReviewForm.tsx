import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import type { Receiver, Sender } from '../../types/user.types';
import type { Amount } from '../../types/transaction.types';
import type { Theme } from '../../types';

interface ReviewFormProps {
  senderDetails: Sender;
  receiverDetails: Receiver;
  amountDetails: Amount;
  reason: string;
  onSubmit: () => void;
  onBack: () => void;
  onUpdateReason: (reason: string) => void;
  theme: Theme;
  isLoading: boolean;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  senderDetails,
  receiverDetails,
  amountDetails,
  reason,
  onSubmit,
  onBack,
  onUpdateReason,
  theme,
  isLoading,
}) => {
  const handleSubmit = () => {
    Alert.alert(
      'Confirm Transaction',
      `You are about to send ${amountDetails.sendAmount} ${amountDetails.sendCurrency} to ${receiverDetails.fullName}. This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: onSubmit,
        },
      ]
    );
  };

  const inputStyle = [
    styles.input,
    {
      backgroundColor: theme.cardBackgroundColor,
      borderColor: theme.borderColor,
      color: theme.textColor,
    },
  ];

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.textColor }]}>
          Review & Send
        </Text>

        <View
          style={[
            styles.section,
            { backgroundColor: theme.cardBackgroundColor },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Transfer Summary
          </Text>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textColor + 'BB' }]}>
              You Send:
            </Text>
            <Text style={[styles.value, { color: theme.textColor }]}>
              {amountDetails.sendAmount} {amountDetails.sendCurrency}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textColor + 'BB' }]}>
              Transfer Fee:
            </Text>
            <Text style={[styles.value, { color: theme.textColor }]}>
              {amountDetails.fees.toFixed(2)} {amountDetails.sendCurrency}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textColor + 'BB' }]}>
              Exchange Rate:
            </Text>
            <Text style={[styles.value, { color: theme.textColor }]}>
              1 {amountDetails.sendCurrency} = {amountDetails.exchangeRate}{' '}
              {amountDetails.receiveCurrency}
            </Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={[styles.totalLabel, { color: theme.textColor }]}>
              Recipient Gets:
            </Text>
            <Text style={[styles.totalValue, { color: theme.successColor }]}>
              {amountDetails.receiveAmount.toFixed(2)}{' '}
              {amountDetails.receiveCurrency}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.section,
            { backgroundColor: theme.cardBackgroundColor },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Sender Details
          </Text>
          <Text style={[styles.detailText, { color: theme.textColor }]}>
            {senderDetails.fullName}
          </Text>
          <Text
            style={[styles.detailSubtext, { color: theme.textColor + 'BB' }]}
          >
            {senderDetails.email}
          </Text>
          <Text
            style={[styles.detailSubtext, { color: theme.textColor + 'BB' }]}
          >
            {senderDetails.phoneNumber}
          </Text>
        </View>

        <View
          style={[
            styles.section,
            { backgroundColor: theme.cardBackgroundColor },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Recipient Details
          </Text>
          <Text style={[styles.detailText, { color: theme.textColor }]}>
            {receiverDetails.fullName}
          </Text>
          <Text
            style={[styles.detailSubtext, { color: theme.textColor + 'BB' }]}
          >
            {receiverDetails.phoneNumber}
          </Text>
          {receiverDetails.email && (
            <Text
              style={[styles.detailSubtext, { color: theme.textColor + 'BB' }]}
            >
              {receiverDetails.email}
            </Text>
          )}

          {receiverDetails.bankAccount && (
            <Text
              style={[styles.detailSubtext, { color: theme.textColor + 'BB' }]}
            >
              Bank: {receiverDetails.bankAccount}
            </Text>
          )}
        </View>

        <Text style={[styles.inputLabel, { color: theme.textColor }]}>
          Reason for Transfer (Optional)
        </Text>
        <TextInput
          style={inputStyle}
          value={reason}
          onChangeText={onUpdateReason}
          placeholder="e.g., Family support, Education, Business"
          placeholderTextColor={theme.textColor + '80'}
        />

        <View
          style={[
            styles.disclaimer,
            { backgroundColor: theme.cardBackgroundColor },
          ]}
        >
          <Text
            style={[styles.disclaimerText, { color: theme.textColor + 'BB' }]}
          >
            By proceeding, you confirm that the information provided is accurate
            and you authorize this transfer. Transfer fees and exchange rates
            are final once confirmed.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.backButton, { borderColor: theme.borderColor }]}
          onPress={onBack}
          disabled={isLoading}
        >
          <Text style={[styles.backButtonText, { color: theme.textColor }]}>
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isLoading
                ? theme.borderColor
                : theme.primaryColor,
            },
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>
            {isLoading ? 'Processing...' : 'Send Money'}
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
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  detailText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  detailSubtext: {
    fontSize: 14,
    marginBottom: 2,
  },
  inputLabel: {
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
  messageInput: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  disclaimer: {
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  disclaimerText: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
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
});
