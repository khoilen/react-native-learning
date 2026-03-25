import { Text } from '@ui-base/components/text/text';
import { Pressable, View } from 'react-native';
import { ReviewItem } from './review-item/review-item';
import { styles } from './styles';

export const ProductReviews = () => (
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

    <ReviewItem
      name="Jane Doe"
      date="2 days ago"
      rating={4}
      avatar="https://i.pravatar.cc"
      comment="Absolutely love this watch! The battery life is impressive and the sleep tracking is very accurate."
    />

    <View style={styles.separator} />

    <ReviewItem
      name="Mark Smith"
      date="1 week ago"
      rating={5}
      avatar="https://i.pravatar.cc"
      comment="The best smartwatch I've owned so far. Highly recommended for the price."
    />
  </View>
);
