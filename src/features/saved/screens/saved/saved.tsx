import { MainTabsParamList } from '@/components/main-tabs/main-tabs';
import { ProductCard } from '@/components/product-card/product-card';
import { useFavoritesStore } from '@/features/saved/stores/use-favorites-store';
import { ScreenLayout } from '@/layouts/screen-layout/screen-layout';
import { HomeStackRoutes } from '@/navigation/stack-navigators/home-stack/home-stack-routes';
import { SavedStackParamList } from '@/navigation/stack-navigators/saved-stack/saved-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from '@ui-base/components/text/text';
import { theme } from '@ui-base/theme/theme';
import { BookmarkX } from 'lucide-react-native';
import { FlatList, View } from 'react-native';
import { styles } from './styles';

type SavedScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SavedStackParamList>,
  BottomTabNavigationProp<MainTabsParamList>
>;

export const Saved = () => {
  const { favorites } = useFavoritesStore();

  const navigation = useNavigation<SavedScreenNavigationProp>();
  const handleProductPress = (id: number) => {
    navigation.navigate('Shop', {
      screen: HomeStackRoutes.ProductDetailScreen,
      params: { id },
    });
  };
  return (
    <ScreenLayout scrollable={false}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.productList}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            style={styles.productCard}
            title={item.name}
            category={item.description}
            imageSource={item.image}
            isFavorite={true}
            price={item.price.toString()}
            onPressCard={() => handleProductPress(item.id)}
          />
        )}
        ItemSeparatorComponent={<View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <BookmarkX size={64} color={theme.colors.border} />
            <Text variant="h2" style={styles.emptyTitle}>
              No saved items
            </Text>
            <Text variant="bodySmall" style={styles.emptySubtitle}>
              Items you favorite will appear here
            </Text>
          </View>
        }
      />
    </ScreenLayout>
  );
};
