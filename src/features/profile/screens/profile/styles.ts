import { theme } from '@ui-base/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.backgroundMuted,
  },
  root: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  error: {
    color: theme.colors.error,
  },
});
