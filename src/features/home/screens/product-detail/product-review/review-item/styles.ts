import { theme } from '@ui-base/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: theme.spacing.m,
  },
  headerText: {
    flex: 1,
    marginLeft: theme.spacing.m,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.backgroundMuted,
  },
  contentContainer: {
    flex: 1,
    marginLeft: theme.spacing.m,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text,
  },
  date: {
    color: theme.colors.textMuted,
  },
  starRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  star: {
    fontSize: 14,
    marginRight: 2,
  },
  comment: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.s,
  },
});
