export const ERRORS = {
  NOT_FOUND: 'Not found',
  INVALID_API_KEY: 'Invalid API key provided',
  TRANSACTION_FAILED: 'Transaction faile',
};

export type errorT = keyof typeof ERRORS;
