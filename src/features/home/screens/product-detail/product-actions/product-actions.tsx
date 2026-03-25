import { Button } from '@ui-base/components/button/button';
import { theme } from '@ui-base/theme/theme';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

export const ProductActions = () => {
  const insets = useSafeAreaInsets();

  const bottomPadding = insets.bottom > 0 ? insets.bottom : theme.spacing.m;

  return (
    <View style={styles.fixedWrapper}>
      <View style={[styles.container, { paddingBottom: bottomPadding }]}>
        <Button isOutline size="large" style={styles.button} onPress={() => {}}>
          Add to Cart
        </Button>
        <Button size="large" style={styles.button} onPress={() => {}}>
          Buy Now
        </Button>
      </View>
    </View>
  );
};
