import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { usePayWidget } from '../../context';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  const { theme } = usePayWidget();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <ActivityIndicator size="large" color={theme.primaryColor} />
      {message && (
        <Text style={[styles.message, { color: theme.textColor }]}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});
