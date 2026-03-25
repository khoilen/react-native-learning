import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.l,
    shadowColor: theme.colors.overlay,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: theme.colors.backgroundAlt,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.m,
    backgroundColor: theme.colors.backgroundMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  title: {
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.text,
  },
});
