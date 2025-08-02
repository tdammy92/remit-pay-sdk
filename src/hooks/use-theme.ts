import { useMemo } from 'react';
import type { Theme } from '../types';
import { getTheme } from '../themes';

export const useTheme = (theme?: 'light' | 'dark' | Theme): Theme => {
  return useMemo(() => getTheme(theme), [theme]);
};
