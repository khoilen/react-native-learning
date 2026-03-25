import { theme } from '@ui-base/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  title: {
    marginBottom: theme.spacing.s,
    color: theme.colors.text,
  },
  description: {
    color: theme.colors.textLighter,
  },
  readMore: {
    marginTop: theme.spacing.s,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.semiBold,
  },
});
