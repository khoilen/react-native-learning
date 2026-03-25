import { Pencil } from 'lucide-react-native';
import { Image, View } from 'react-native';
import { theme } from '../../theme/theme';
import { Button } from '../button/button';
import { Text } from '../text/text';
import { styles } from './styles';

export type ProfileHeaderProps = {
  avatarUrl: string;
  name: string;
  username: string;
  isPremium?: boolean;
  onEditPress?: () => void;
};

export const ProfileHeader = ({
  name,
  username,
  avatarUrl,
  isPremium = false,
  onEditPress,
}: ProfileHeaderProps) => (
  <View style={styles.container}>
    <View style={styles.avatarWrapper}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <Button
        variant="icon"
        size="small"
        styleInner={styles.editButton}
        onPress={onEditPress}
      >
        <Pencil size={16} color={theme.colors.onPrimary} />
      </Button>
    </View>
    <View style={styles.infoContainer}>
      <Text variant="h2" style={styles.name}>
        {name}
      </Text>
      <Text variant="bodySmall" style={styles.username}>
        @{username}
      </Text>
      {isPremium && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumText}>PREMIUM MEMBER</Text>
        </View>
      )}
    </View>
  </View>
);
