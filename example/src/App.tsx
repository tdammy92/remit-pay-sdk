import RemitWidgt, {
  type Transaction,
  type TransactionError,
} from 'remit-pay-sdk';

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleSuccess = (transaction: Transaction) => {
    console.log('Transaction successful:', transaction);
    console.log('TRANSACTIONS', JSON.stringify(transaction));
  };

  const handleError = (error: TransactionError) => {
    console.error('Transaction error:', error);
    Alert.alert('Error', error.message);
  };

  const handleCancel = () => {};

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const testInvalidApiKey = () => {};

  return (
    <>
      <SafeAreaView
        style={[styles.container, theme === 'dark' && styles.darkContainer]}
      >
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme === 'dark' ? '#000000' : '#FFFFFF'}
        />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.title, theme === 'dark' && styles.darkText]}>
              Remittance Widget SDK
            </Text>
            <Text
              style={[styles.subtitle, theme === 'dark' && styles.darkSubtext]}
            >
              Demo Application
            </Text>
          </View>

          <View
            style={[styles.section, theme === 'dark' && styles.darkSection]}
          >
            <Text
              style={[styles.sectionTitle, theme === 'dark' && styles.darkText]}
            >
              Quick Start
            </Text>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                theme === 'dark' && styles.darkPrimaryButton,
              ]}
              onPress={() => RemitWidgt.open()}
            >
              <Text style={styles.primaryButtonText}>Send Money</Text>
            </TouchableOpacity>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.secondaryButton,
                  theme === 'dark' && styles.darkSecondaryButton,
                ]}
                onPress={toggleTheme}
              >
                <Text
                  style={[
                    styles.secondaryButtonText,
                    theme === 'dark' && styles.darkText,
                  ]}
                >
                  {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[styles.section, theme === 'dark' && styles.darkSection]}
          >
            <Text
              style={[styles.sectionTitle, theme === 'dark' && styles.darkText]}
            >
              Testing Features
            </Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.testButton,
                  theme === 'dark' && styles.darkSecondaryButton,
                ]}
                onPress={testInvalidApiKey}
              >
                <Text
                  style={[
                    styles.secondaryButtonText,
                    theme === 'dark' && styles.darkText,
                  ]}
                >
                  Test Invalid API Key
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <RemitWidgt
        apiKey={'1GH34535453'}
        onSuccess={handleSuccess}
        onError={handleError}
        onCancel={handleCancel}
        customTheme={theme}
        defaultSendCurrency="USD"
        defaultReceiveCurrency="NGN"
        testMode={true}
      />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkSubtext: {
    color: '#CCCCCC',
  },
  section: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  darkSection: {
    backgroundColor: '#1E1E1E',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#222',
  },
  buttonGroup: {
    marginTop: 12,
  },
  primaryButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  darkPrimaryButton: {
    backgroundColor: '#90CAF9',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  darkSecondaryButton: {
    backgroundColor: '#333333',
  },
  secondaryButtonText: {
    fontSize: 14,
    color: '#111',
  },
  testButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
});
