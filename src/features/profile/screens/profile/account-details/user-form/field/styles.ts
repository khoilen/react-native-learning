import { theme } from '@ui-base/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: theme.spacing.l,
    zIndex: 1, 
    elevation: 1, 
  },
  label: {
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.s,
    fontWeight: theme.fontWeights.medium,
  },
  valueText: {
    color: theme.colors.text,
    paddingLeft: theme.spacing.xs,
  },
});
