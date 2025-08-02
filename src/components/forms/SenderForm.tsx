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
import type { Sender } from '../../types/user.types';
import type { Theme, ValidationErrors } from '../../types';
import { validateSenderDetails } from '../../utils/validation-helper';

interface SenderFormProps {
  senderDetails: Partial<Sender>;
  onUpdateSender: (details: Partial<Sender>) => void;
  onNext: () => void;
  theme: Theme;
}

export const SenderForm: React.FC<SenderFormProps> = ({
  senderDetails,
  onUpdateSender,
  onNext,
  theme,
}) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (field: keyof Sender, value: string) => {
    onUpdateSender({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    const validationErrors = validateSenderDetails(senderDetails);
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
          Sender Information
        </Text>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={[styles.label, { color: theme.textColor }]}>
              First Name *
            </Text>
            <TextInput
              style={errors.firstName ? errorInputStyle : inputStyle}
              value={senderDetails.firstName || ''}
              onChangeText={(value) => handleInputChange('firstName', value)}
              placeholder="Enter first name"
              placeholderTextColor={theme.textColor + '80'}
            />
            {errors.firstName && (
              <Text style={[styles.errorText, { color: theme.errorColor }]}>
                {errors.firstName}
              </Text>
            )}
          </View>

          <View style={styles.halfInput}>
            <Text style={[styles.label, { color: theme.textColor }]}>
              Last Name *
            </Text>
            <TextInput
              style={errors.lastName ? errorInputStyle : inputStyle}
              value={senderDetails.lastName || ''}
              onChangeText={(value) => handleInputChange('lastName', value)}
              placeholder="Enter last name"
              placeholderTextColor={theme.textColor + '80'}
            />
            {errors.lastName && (
              <Text style={[styles.errorText, { color: theme.errorColor }]}>
                {errors.lastName}
              </Text>
            )}
          </View>
        </View>

        <Text style={[styles.label, { color: theme.textColor }]}>Email *</Text>
        <TextInput
          style={errors.email ? errorInputStyle : inputStyle}
          value={senderDetails.email || ''}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="Enter email address"
          placeholderTextColor={theme.textColor + '80'}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && (
          <Text style={[styles.errorText, { color: theme.errorColor }]}>
            {errors.email}
          </Text>
        )}

        <Text style={[styles.label, { color: theme.textColor }]}>
          Phone Number *
        </Text>
        <TextInput
          style={errors.phoneNumber ? errorInputStyle : inputStyle}
          value={senderDetails.phoneNumber || ''}
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
          Address *
        </Text>
        <TextInput
          style={errors.address ? errorInputStyle : inputStyle}
          value={senderDetails.address || ''}
          onChangeText={(value) => handleInputChange('address', value)}
          placeholder="Enter street address"
          placeholderTextColor={theme.textColor + '80'}
        />
        {errors.address && (
          <Text style={[styles.errorText, { color: theme.errorColor }]}>
            {errors.address}
          </Text>
        )}

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={[styles.label, { color: theme.textColor }]}>
              City *
            </Text>
            <TextInput
              style={errors.city ? errorInputStyle : inputStyle}
              value={senderDetails.city || ''}
              onChangeText={(value) => handleInputChange('city', value)}
              placeholder="Enter city"
              placeholderTextColor={theme.textColor + '80'}
            />
            {errors.city && (
              <Text style={[styles.errorText, { color: theme.errorColor }]}>
                {errors.city}
              </Text>
            )}
          </View>

          <View style={styles.halfInput}>
            <Text style={[styles.label, { color: theme.textColor }]}>
              Postal Code *
            </Text>
            <TextInput
              style={errors.postalCode ? errorInputStyle : inputStyle}
              value={senderDetails.postalCode || ''}
              onChangeText={(value) => handleInputChange('postalCode', value)}
              placeholder="Enter postal code"
              placeholderTextColor={theme.textColor + '80'}
            />
            {errors.postalCode && (
              <Text style={[styles.errorText, { color: theme.errorColor }]}>
                {errors.postalCode}
              </Text>
            )}
          </View>
        </View>

        <Text style={[styles.label, { color: theme.textColor }]}>
          Country *
        </Text>
        <TextInput
          style={errors.country ? errorInputStyle : inputStyle}
          value={senderDetails.country || ''}
          onChangeText={(value) => handleInputChange('country', value)}
          placeholder="Enter country"
          placeholderTextColor={theme.textColor + '80'}
        />
        {errors.country && (
          <Text style={[styles.errorText, { color: theme.errorColor }]}>
            {errors.country}
          </Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primaryColor }]}
        onPress={handleNext}
      >
        <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>
          Continue
        </Text>
      </TouchableOpacity>
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
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
