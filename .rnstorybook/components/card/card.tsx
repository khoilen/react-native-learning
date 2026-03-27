import { Heart } from 'lucide-react-native';
import { ReactNode } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { theme } from '../../theme/theme';
import { Text } from '../text/text';
import { styles } from './styles';

export type CardProps = {
  caption: string;
  imageSource: ImageSourcePropType | string;
  title: string;
  footer?: ReactNode;
  onFavoritePress?: () => void;
  onPressCard?: () => void;
  style?: StyleProp<ViewStyle>;
  testId?: string;
};

export const Card = ({
  title,
  caption,
  imageSource,
  footer,
  onFavoritePress,
  onPressCard,
  style,
  testId,
}: CardProps) => {
  const resolvedSource =
    typeof imageSource === 'string' ? { uri: imageSource } : imageSource;

  return (
    <View style={[styles.container, style]} testID={testId}>
      <TouchableOpacity onPress={onPressCard}>
        <View style={styles.imageWrapper}>
          <Image source={resolvedSource} style={styles.image} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.favoriteBtn}
            onPress={onFavoritePress}
            accessibilityRole="button"
          >
            <Heart size={18} color={theme.colors.text} fill="none" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text variant="bodySmall" style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text variant="caption" style={styles.caption} numberOfLines={2}>
            {caption}
          </Text>
        </View>
      </TouchableOpacity>
      {footer && footer}
    </View>
  );
};
