import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { Receiver } from '../../types/user.types';
import type { Theme, ValidationErrors } from '../../types';
import { validateReceiverDetails } from '../../utils/validation-helper';

interface ReceiverFormProps {
  receiverDetails: Partial<Receiver>;
  onUpdateReceiver: (details: Partial<Receiver>) => void;
  onNext: () => void;
  onBack: () => void;
  theme: Theme;
}

export const ReceiverForm: React.FC<ReceiverFormProps> = ({
  receiverDetails,
  onUpdateReceiver,
  onNext,
  onBack,
  theme,
}) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (field: keyof Receiver, value: string) => {
    onUpdateReceiver({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    const validationErrors = validateReceiverDetails(receiverDetails);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.textColor }]}>
          Beneficiary Information
        </Text>

        <Text style={[styles.label, { color: theme.textColor }]}>
          Full Name *
        </Text>
        <TextInput
          style={errors.firstName ? errorInputStyle : inputStyle}
          value={receiverDetails.fullName || ''}
          onChangeText={(value) => handleInputChange('fullName', value)}
          placeholder="Enter first name"
          placeholderTextColor={theme.textColor + '80'}
        />
        {errors.firstName && (
          <Text style={[styles.errorText, { color: theme.errorColor }]}>
            {errors.firstName}
          </Text>
        )}

        <Text style={[styles.label, { color: theme.textColor }]}>
          Phone Number *
        </Text>
        <TextInput
          style={errors.phoneNumber ? errorInputStyle : inputStyle}
          value={receiverDetails.phoneNumber || ''}
          onChangeText={(value) => handleInputChange('phoneNumber', value)}
          placeholder="Enter phone number"
          placeholderTextColor={theme.textColor + '80'}
          keyboardType="phone-pad"
        />
        {errors.phoneNumber && (
          <Text style={[styles.errorText, { color: theme.errorColor }]}>
            {errors.phoneNumber}
          </Text>
        )}

        <Text style={[styles.label, { color: theme.textColor }]}>
          Email (Optional)
        </Text>
        <TextInput
          style={inputStyle}
          value={receiverDetails.email || ''}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="Enter email address"
          placeholderTextColor={theme.textColor + '80'}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={[styles.label, { color: theme.textColor }]}>
          Bank Account *
        </Text>
        <TextInput
          style={inputStyle}
          value={receiverDetails.bankAccount || ''}
          onChangeText={(value) => handleInputChange('bankAccount', value)}
          placeholder="Enter bank account number"
          placeholderTextColor={theme.textColor + '80'}
        />

        <Text style={[styles.label, { color: theme.textColor }]}>
          Bank Code (Optional)
        </Text>
        <TextInput
          style={inputStyle}
          value={receiverDetails.bankCode || ''}
          onChangeText={(value) => handleInputChange('bankCode', value)}
          placeholder="Enter bank code"
          placeholderTextColor={theme.textColor + '80'}
        />
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
          style={[styles.button, { backgroundColor: theme.primaryColor }]}
          onPress={handleNext}
        >
          <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 0.48,
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
