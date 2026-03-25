import { Text } from '@ui-base/components/text/text';
import { theme } from '@ui-base/theme/theme';
import { Image, View } from 'react-native';
import { styles } from './styles';

type ReviewItemProps = {
  avatar: string;
  comment: string;
  date: string;
  name: string;
  rating: number;
};

export const ReviewItem = ({
  name,
  date,
  rating,
  comment,
  avatar,
}: ReviewItemProps) => (
  <View style={styles.itemContainer}>
    <View style={styles.headerRow}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.headerText}>
        <View style={styles.nameRow}>
          <Text variant="bodySmall" style={styles.name}>
            {name}
          </Text>
          <Text variant="caption" style={styles.date}>
            {date}
          </Text>
        </View>
        <View style={styles.starRow}>
          {[...Array(5)].map((_, i) => (
            <Text
              key={i}
              style={[
                styles.star,
                {
                  color: i < rating ? theme.colors.yellow : theme.colors.border,
                },
              ]}
            >
              ★
            </Text>
          ))}
        </View>
      </View>
    </View>
    <Text variant="bodySmall" style={styles.comment}>
      {comment}
    </Text>
  </View>
);
