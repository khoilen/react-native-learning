import { theme } from '@ui-base/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
    color: theme.colors.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    minHeight: 66,
  },
  iconContainer: {
    backgroundColor: theme.colors.cyanLight,
    borderRadius: 8,
    width: 40,
    height: 40,
    padding: 8,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  value: {
    fontWeight: '700',
    color: theme.colors.text,
  },
});
