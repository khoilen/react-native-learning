import { theme } from '@ui-base/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    paddingInline: 16,
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cart: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  categories: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingBlock: 20,
  },
  productList: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    maxWidth: '48%',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  separator: { height: 16 },
});
