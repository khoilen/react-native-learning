import { Loading } from '@/components/loading/loading';
import { ProductCard } from '@/components/product-card/product-card';
import { useAuthStore } from '@/features/authentication/stores/authentication-store';
import { HomeStackParamList } from '@/navigation/stack-navigators/home-stack/home-stack';
import { HomeStackRoutes } from '@/navigation/stack-navigators/home-stack/home-stack-routes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button } from '@ui-base/components/button/button';
import { TextInput } from '@ui-base/components/text-input/text-input';
import { Text } from '@ui-base/components/text/text';
import { theme } from '@ui-base/theme/theme';
import { Bell, Search, ShoppingCart } from 'lucide-react-native';
import { FlatList, View } from 'react-native';
import { useProductsQuery } from '../../hooks/query/use-products-query';
import { styles } from './styles';

export const Home = () => {
  const { user } = useAuthStore(state => state);
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const {
    data: products,
    isLoading: isLoadingProducts,
    isFetching,
    refetch,
  } = useProductsQuery({
    enabled: !!user,
  });

  const handleProductPress = (id: number) => {
    navigation.navigate(HomeStackRoutes.ProductDetailScreen, {
      id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1">Discover</Text>
        <View style={styles.cart}>
          <Button variant="icon">
            <Bell width={16} />
          </Button>
          <Button variant="icon">
            <ShoppingCart width={16} />
          </Button>
        </View>
      </View>
      <TextInput
        placeholder="Search products, brands..."
        leftIcon={<Search size={20} color={theme.colors.textMuted} />}
        inputContainerStyle={{
          backgroundColor: theme.colors.backgroundMuted,
        }}
      />
      <View style={styles.categories}>
        <Button>All items</Button>
        <Button variant="tertiary">Electronics</Button>
        <Button variant="tertiary">Fashion</Button>
      </View>

      {isLoadingProducts && !products ? (
        <Loading size="large" />
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.productList}
          renderItem={({ item }) => (
            <ProductCard
              title={item.name}
              category={item.description}
              imageSource={item.image}
              price={String(item.price)}
              onPressCard={() => handleProductPress(item.id)}
              style={styles.card}
            />
          )}
          ListEmptyComponent={<Text>No items found</Text>}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isFetching}
          ItemSeparatorComponent={<View style={styles.separator} />}
        />
      )}
    </View>
  );
};
