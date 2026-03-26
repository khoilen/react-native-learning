import { theme } from '@ui-base/theme/theme'; // Adjust path as needed
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.l,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 20,
  },
  buttonText: {
    fontWeight: '700',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  primaryText: {
    color: theme.colors.onPrimary,
  },
  secondary: {
    backgroundColor: theme.colors.transparent,
    borderColor: theme.colors.overlay,
    borderWidth: 1,
  },
  secondaryText: {
    color: theme.colors.textSecondary,
  },
  outlineGray: {
    backgroundColor: theme.colors.transparent,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  outlineGrayText: {
    color: theme.colors.textMuted,
  },
  outline: {
    backgroundColor: theme.colors.transparent,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  outlineText: {
    color: theme.colors.primary,
  },
  small: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.l,
  },
  smallText: { fontSize: 12 },
  medium: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.xl,
  },
  mediumText: { fontSize: 14 },
  large: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.xxl,
  },
  largeText: { fontSize: 16 },
  fullWidth: { width: '100%' },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    backgroundColor: theme.colors.backgroundAlt,
    borderColor: theme.colors.transparent,
    borderRadius: theme.borderRadius.full,
    padding: 0,
    width: 44,
    height: 44,
  },
  tertiary: {
    backgroundColor: theme.colors.backgroundAlt,
    borderWidth: 0,
  },
  tertiaryText: {
    color: theme.colors.textSecondary,
  },
  loading: {
    marginRight: 5,
  },
});
