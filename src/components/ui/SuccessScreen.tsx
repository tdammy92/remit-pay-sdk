import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import type { Transaction } from '../../types/transaction.types';
import type { Theme } from '../../types';

interface SuccessScreenProps {
  transaction: Transaction;
  onClose: () => void;
  onStartNew: () => void;
  theme: Theme;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  transaction,
  onClose,
  onStartNew,
  theme,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const checkmarkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(checkmarkAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const checkmarkScale = checkmarkAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1.2, 1],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundColor,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.checkmarkContainer,
            {
              backgroundColor: theme.successColor,
              transform: [{ scale: checkmarkScale }],
            },
          ]}
        >
          <Text style={styles.checkmark}>✓</Text>
        </Animated.View>

        <Text style={[styles.title, { color: theme.textColor }]}>
          Transfer Successful!
        </Text>

        <Text style={[styles.subtitle, { color: theme.textColor + 'BB' }]}>
          Your money is on its way to {transaction.data.receiver.fullName}
        </Text>

        <View
          style={[
            styles.detailsCard,
            { backgroundColor: theme.cardBackgroundColor },
          ]}
        >
          <View style={styles.detailRow}>
            <Text
              style={[styles.detailLabel, { color: theme.textColor + 'BB' }]}
            >
              Transaction ID:
            </Text>
            <Text style={[styles.detailValue, { color: theme.textColor }]}>
              {transaction.id}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text
              style={[styles.detailLabel, { color: theme.textColor + 'BB' }]}
            >
              Amount Sent:
            </Text>
            <Text style={[styles.detailValue, { color: theme.textColor }]}>
              {transaction.data.amount.sendAmount}{' '}
              {transaction.data.amount.sendCurrency}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text
              style={[styles.detailLabel, { color: theme.textColor + 'BB' }]}
            >
              Amount Received:
            </Text>
            <Text style={[styles.detailValue, { color: theme.successColor }]}>
              {transaction.data.amount.receiveAmount.toFixed(2)}{' '}
              {transaction.data.amount.receiveCurrency}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text
              style={[styles.detailLabel, { color: theme.textColor + 'BB' }]}
            >
              Estimated Arrival:
            </Text>
            <Text style={[styles.detailValue, { color: theme.textColor }]}>
              {formatDate(transaction.estimatedArrival)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text
              style={[styles.detailLabel, { color: theme.textColor + 'BB' }]}
            >
              Status:
            </Text>
            <Text style={[styles.statusValue, { color: theme.primaryColor }]}>
              {transaction.status.charAt(0).toUpperCase() +
                transaction.status.slice(1)}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.infoCard,
            { backgroundColor: theme.primaryColor + '20' },
          ]}
        >
          <Text style={[styles.infoText, { color: theme.textColor }]}>
            📱 We'll send you updates via SMS and email about your transfer
            status.
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.secondaryButton, { borderColor: theme.borderColor }]}
          onPress={onStartNew}
        >
          <Text
            style={[styles.secondaryButtonText, { color: theme.textColor }]}
          >
            Send Another
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.primaryButton,
            { backgroundColor: theme.primaryColor },
          ]}
          onPress={onClose}
        >
          <Text
            style={[styles.primaryButtonText, { color: theme.buttonTextColor }]}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  detailsCard: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  infoCard: {
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  primaryButton: {
    flex: 0.65,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 0.3,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
