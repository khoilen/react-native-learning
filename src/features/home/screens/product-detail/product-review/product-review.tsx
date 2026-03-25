import { Loading } from '@/components/loading/loading';
import { useProductReviewsQuery } from '@/features/home/hooks/query/use-product-review-query';
import { Text } from '@ui-base/components/text/text';
import { Pressable, View } from 'react-native';
import { ReviewItem } from './review-item/review-item';
import { styles } from './styles';

type ProductReviewsProps = {
  productId: number;
};

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { data: reviews, isLoading } = useProductReviewsQuery(productId);

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text variant="h2" style={styles.sectionTitle}>
          User Reviews
        </Text>
        <Pressable>
          <Text variant="bodySmall" style={styles.seeAll}>
            See All
          </Text>
        </Pressable>
      </View>

      {reviews.map((review, index) => (
        <View key={review.id}>
          <ReviewItem
            name="User"
            date="2 days ago"
            rating={review.rating}
            avatar="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            comment={review.message}
          />
          {index < reviews.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </View>
  );
};
