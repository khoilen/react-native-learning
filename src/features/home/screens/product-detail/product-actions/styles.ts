import { theme } from '@ui-base/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fixedWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.m,
    gap: theme.spacing.m,
  },
  button: {
    width: '50%',
  },
});
