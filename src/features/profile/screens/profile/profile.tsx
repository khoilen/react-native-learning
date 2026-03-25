import { useAuthStore } from '@/features/authentication/stores/authentication-store';
import { ScreenLayout } from '@/layouts/screen-layout/screen-layout';
import { useNavigation } from '@react-navigation/native';
import { MenuTile } from '@ui-base/components/menu-tile/menu-tile';
import { ProfileHeader } from '@ui-base/components/profile-header/profile-header';
import { theme } from '@ui-base/theme/theme';
import { Lock, LogOut, Settings } from 'lucide-react-native';
import { View } from 'react-native';
import { AccountDetailsCard } from './account-details/account-details';
import { styles } from './styles';

export const Profile = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuthStore(state => state);

  if (!user) {
    return null;
  }

  return (
    <ScreenLayout
      title="Profile Settings"
      rightIcon={<Settings />}
      onBackPress={() => navigation.goBack()}
      stylesWrapper={styles.wrapper}
    >
      <View style={styles.root}>
        <ProfileHeader
          name={user.firstName}
          username={user.username}
          avatarUrl=""
          isPremium
        />
        <AccountDetailsCard />
        <MenuTile title="Order" icon={Lock} />
        <MenuTile
          title="Logout"
          icon={LogOut}
          showChevron={false}
          stylesTextTitle={styles.error}
          iconColor={theme.colors.error}
          onPress={() => logout()}
        />
      </View>
    </ScreenLayout>
  );
};
