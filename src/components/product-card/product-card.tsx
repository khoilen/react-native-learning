import { Button } from '@ui-base/components/button/button';
import { Card, type CardProps } from '@ui-base/components/card/card';
import { Text } from '@ui-base/components/text/text';
import { theme } from '@ui-base/theme/theme';
import { Plus } from 'lucide-react-native';
import { View } from 'react-native';
import { styles } from './styles';

type ProductCard = Omit<CardProps, 'title' | 'caption' | 'footer'> & {
  category: string;
  price: string;
  title: string;
  onAddPress?: () => void;
};

export const ProductCard = ({
  imageSource,
  category,
  title,
  onAddPress,
  price,
  ...restProps
}: ProductCard) => (
  <Card
    {...restProps}
    imageSource={imageSource}
    caption={category}
    title={title}
    footer={
      <View style={styles.footer}>
        <Text variant="body" style={styles.price}>
          {price}
        </Text>
        <Button
          activeOpacity={0.8}
          size="small"
          styleInner={styles.addBtn}
          variant="icon"
          onPress={onAddPress}
        >
          <Plus size={16} color={theme.colors.onPrimary} />
        </Button>
      </View>
    }
  />
);
