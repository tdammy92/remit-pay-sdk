import type { Theme } from '../types';

export const lightTheme: Theme = {
  primaryColor: '#007AFF',
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  borderColor: '#E5E5EA',
  errorColor: '#FF3B30',
  successColor: '#34C759',
  cardBackgroundColor: '#F2F2F7',
  buttonTextColor: '#FFFFFF',
};

export const darkTheme: Theme = {
  primaryColor: '#0A84FF',
  backgroundColor: '#000000',
  textColor: '#FFFFFF',
  borderColor: '#38383A',
  errorColor: '#FF453A',
  successColor: '#32D74B',
  cardBackgroundColor: '#1C1C1E',
  buttonTextColor: '#FFFFFF',
};

export const getTheme = (theme?: 'light' | 'dark' | Theme): Theme => {
  if (typeof theme === 'object') {
    return theme;
  }
  return theme === 'dark' ? darkTheme : lightTheme;
};
