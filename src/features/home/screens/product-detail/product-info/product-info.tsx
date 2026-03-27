import { Product } from '@/features/home/types/product';
import { Text } from '@ui-base/components/text/text';
import { theme } from '@ui-base/theme/theme';
import { Heart } from 'lucide-react-native';
import { View } from 'react-native'; // Import from react-native, not lucide
import { styles } from './styles';

export type ProductInfoProps = {
  product: Product;
};

export const ProductInfo = ({ product }: ProductInfoProps) => (
  <View style={styles.container}>
    <View style={styles.baseInfo}>
      <Text style={styles.saleText}>NEW ARRIVAL</Text>
      <Text variant="heading">{product.name}</Text>
      <Text variant="heading">${product.price}</Text>
    </View>
    <Heart size={24} color={theme.colors.textMuted} />
  </View>
);
