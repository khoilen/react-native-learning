import { ChevronRight, LucideIcon } from 'lucide-react-native';
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { Text } from '../../components/text/text';
import { theme } from '../../theme/theme';
import { styles } from './styles';

export type MenuTileProps = {
  icon: LucideIcon;
  title: string;
  iconColor?: string;
  onPress?: () => void;
  showChevron?: boolean;
  stylesTextTitle?: StyleProp<TextStyle>;
  stylesWrapper?: StyleProp<ViewStyle>;
};

export const MenuTile = ({
  icon: Icon,
  title,
  onPress,
  stylesWrapper,
  showChevron = true,
  stylesTextTitle,
  iconColor,
}: MenuTileProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.container,
      stylesWrapper,
      pressed && styles.pressed,
    ]}
  >
    <View style={styles.leftSection}>
      <View style={styles.iconContainer}>
        <Icon size={20} color={iconColor ?? theme.colors.text} />
      </View>
      <Text variant="body" style={[styles.title, stylesTextTitle]}>
        {title}
      </Text>
    </View>

    {showChevron && <ChevronRight size={18} color={theme.colors.textMuted} />}
  </Pressable>
);
