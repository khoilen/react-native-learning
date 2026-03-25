import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.l,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: theme.spacing.l,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.backgroundMuted,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 32,
    width: 32,
    backgroundColor: theme.colors.primary,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    marginBottom: theme.spacing.xs,
  },
  username: {
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.m,
  },
  premiumBadge: {
    backgroundColor: theme.colors.cyanLight,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.full,
  },
  premiumText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: theme.fontWeights.bold,
    letterSpacing: 0.5,
  },
});
