import { theme } from '@ui-base/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.l,
    shadowColor: theme.colors.overlay,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  editButton: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.semiBold,
    fontSize: 14,
  },
  editContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  saveButton: {
    paddingInline: 15,
  },
});
