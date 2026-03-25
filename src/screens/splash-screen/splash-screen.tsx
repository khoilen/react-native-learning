import { Loading } from '@/components/loading/loading';
import { theme } from '@ui-base/theme/theme';
import { View } from 'react-native';
import { styles } from './styles';

export const SplashScreen = () => (
  <View style={styles.container}>
    <Loading size="large" color={theme.colors.primary} />
  </View>
);
