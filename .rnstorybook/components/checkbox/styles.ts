import { theme } from '@ui-base/theme/theme'; // Adjust path as needed
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.s,
    alignItems: 'center',
  },
  box: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.borderRadius.s,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: theme.colors.primary,
  },
  inner: {
    width: 10,
    height: 10,
    backgroundColor: theme.colors.onPrimary,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledLabel: {
    color: theme.colors.disabled,
  },
  label: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});
