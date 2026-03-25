import { theme } from '@ui-base/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  saleText: { color: theme.colors.primary, fontWeight: '700', fontSize: 12 },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 20,
    paddingHorizontal: theme.spacing.l,
  },
  baseInfo: { flex: 1 },
});
