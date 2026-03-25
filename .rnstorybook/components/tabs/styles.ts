import { theme } from '@ui-base/theme/theme'; // Adjust path as needed
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.border,
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.m,
  },
  tab: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: theme.borderRadius.m,
  },
  activeTab: {
    backgroundColor: theme.colors.white,
    elevation: 2,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contentArea: {
    flex: 1,
    marginTop: theme.spacing.l,
  },
  label: {
    ...theme.typography.bodySmall,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },
  activeLabel: {
    color: theme.colors.borderStrong,
    fontWeight: '600',
  },
});
