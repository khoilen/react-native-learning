import { theme } from '@ui-base/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    flex: 1,
    maxWidth: '48%',
  },
  productList: {
    paddingInline: 20,
    paddingBlock: 30,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    marginTop: 16,
    color: theme.colors.text,
  },
  emptySubtitle: {
    marginTop: 8,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  separator: { height: 16 },
});
