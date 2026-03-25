import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
  base: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: theme.colors.text,
  },
  h1: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    color: theme.colors.text,
  },
  h2: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
    color: theme.colors.text,
  },
  h2Bold: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22.5,
    letterSpacing: -0.45,
    color: theme.colors.text,
  },
  body: {
    ...theme.typography.bodyMedium,
  },
  bodySmall: {
    ...theme.typography.bodySmall,
  },
  caption: {
    ...theme.typography.caption,
  },
});
