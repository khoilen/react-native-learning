import { Loading } from '@/components/loading/loading';
import { ScreenLayout } from '@/layouts/screen-layout/screen-layout';
import { HomeStackParamList } from '@/navigation/stack-navigators/home-stack/home-stack';
import { HomeStackRoutes } from '@/navigation/stack-navigators/home-stack/home-stack-routes';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Carousel } from '@ui-base/components/carousel/carousel';
import { Share2 } from 'lucide-react-native';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import { useProductDetailQuery } from '../../hooks/query/use-products-detail-query';
import { ProductActions } from './product-actions/product-actions';
import { ProductDescription } from './product-description/product-description';
import { ProductFeatures } from './product-features/product-features';
import { ProductInfo } from './product-info/product-info';
import { ProductReviews } from './product-review/product-review';
import { styles } from './styles';

export const ProductDetail = () => {
  const navigation = useNavigation();
  const route =
    useRoute<
      RouteProp<HomeStackParamList, HomeStackRoutes.ProductDetailScreen>
    >();
  const { id } = route.params;
  const { data: product, isFetching } = useProductDetailQuery(id);

  return (
    <GestureHandlerRootView>
      <ScreenLayout
        title="Product Details"
        rightIcon={<Share2 />}
        onBackPress={() => navigation.goBack()}
      >
        {isFetching && !product ? (
          <Loading size="large" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            <Carousel
              data={[
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
                'https://images.unsplash.com/photo-1512496015851-a90fb38ba796',
                'https://images.unsplash.com/photo-1585386959984-a41552231658',
              ]}
              height={390}
            />
            <ProductInfo product={product!} />
            <ProductFeatures />
            <ProductDescription description={product?.description!} />
            <ProductReviews />
          </ScrollView>
        )}
      </ScreenLayout>
      <ProductActions />
    </GestureHandlerRootView>
  );
};
