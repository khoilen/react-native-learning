import { ChevronLeft } from 'lucide-react-native';
import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import { Button } from '../button/button';
import { Text } from '../text/text';
import { styles } from './styles';

export type BreadcrumbProps = {
  title: string;
  onBackPress?: () => void;
  rightIcon?: ReactNode;
  showBack?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Breadcrumb = ({
  title,
  rightIcon,
  onBackPress,
  showBack = true,
  style,
}: BreadcrumbProps) => {
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  return (
    <View style={[styles.container, style]}>
      {showBack && (
        <Button
          size="small"
          variant="icon"
          onPress={handleBack}
          styleInner={styles.backButton}
          accessibilityRole="button"
        >
          <ChevronLeft size={24} color={theme.colors.text} />
        </Button>
      )}
      <Text variant="h2" numberOfLines={1}>
        {title}
      </Text>
      {rightIcon && rightIcon}
    </View>
  );
};
