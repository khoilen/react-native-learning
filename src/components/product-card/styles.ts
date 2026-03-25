import { theme } from '@ui-base/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: theme.colors.text,
    fontWeight: theme.fontWeights.bold,
  },
  addBtn: {
    backgroundColor: theme.colors.primary,
    width: 30,
    height: 30,
  },
});
