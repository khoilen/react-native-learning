import { theme } from '@ui-base/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sectionContainer: {
    padding: theme.spacing.l,
    backgroundColor: theme.colors.background,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    color: theme.colors.text,
  },
  seeAll: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.semiBold,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.borderLight,
    marginVertical: theme.spacing.m,
  },
});
