import { theme } from '@ui-base/theme/theme'; // Adjust path
import { StyleSheet } from 'react-native';

export const toastStyles = StyleSheet.create({
  base: {
    minHeight: 60,
    height: undefined,
    paddingVertical: theme.spacing.s,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.m,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorBorder: {
    borderLeftColor: theme.colors.error,
  },
  successBorder: {
    borderLeftColor: theme.colors.primary,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.m,
  },
  title: {
    fontSize: theme.typography.bodyMedium.fontSize,
    fontWeight: '700',
    color: theme.colors.text,
  },
  description: {
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.colors.textSecondary,
  },
});
