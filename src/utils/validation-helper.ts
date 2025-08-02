import type { ValidationErrors } from '../types';
import type { Receiver, Sender } from '../types/user.types';

export const validateAmount = (
  amount: number,
  minAmount: number = 1,
  maxAmount: number = 10000
): string | null => {
  if (!amount || amount <= 0) {
    return 'Amount must be greater than 0';
  }

  if (amount < minAmount) {
    return `Minimum amount is ${minAmount}`;
  }

  if (amount > maxAmount) {
    return `Maximum amount is ${maxAmount}`;
  }

  return null;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validateReceiverDetails = (
  receiver: Partial<Receiver>
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!receiver.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!receiver.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!receiver.phoneNumber?.trim()) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!validatePhoneNumber(receiver.phoneNumber)) {
    errors.phoneNumber = 'Invalid phone number format';
  }

  return errors;
};

export const validateSenderDetails = (
  sender: Partial<Sender>
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!sender.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!sender.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!sender.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(sender.email)) {
    errors.email = 'Invalid email format';
  }

  if (!sender.phoneNumber?.trim()) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!validatePhoneNumber(sender.phoneNumber)) {
    errors.phoneNumber = 'Invalid phone number format';
  }

  return errors;
};
