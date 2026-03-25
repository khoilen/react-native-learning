import { theme } from '@ui-base/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    paddingBottom: theme.spacing.s,
    backgroundColor: theme.colors.white,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    marginVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
    height: 48,
  },
  tabLabel: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '500',
  },
});
