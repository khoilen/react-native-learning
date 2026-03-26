import { useAuthStore } from '@/features/authentication/stores/authentication-store';
import { useUpdateUserMutation } from '@/features/profile/hooks/mutation/use-user-mutation';
import { User } from '@/types/user';
import { Button } from '@ui-base/components/button/button';
import { Text } from '@ui-base/components/text/text';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { styles } from './styles';
import { UserForm } from './user-form/user-form';

export type FormValues = Pick<User, 'firstName' | 'lastName' | 'email'> & {
  age: string;
};

export const AccountDetailsCard = () => {
  const { user, setUser: setUserLocal } = useAuthStore(state => state);
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync: updateUserSync, isPending } = useUpdateUserMutation();
  const methods = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      age: user?.age.toString(),
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    },
  });

  if (!user) {
    return null;
  }

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const handleCancelEdit = () => {
    if (isDirty) {
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure you want to cancel?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => {
              reset();
              setIsEditing(false);
            },
          },
        ],
      );
    } else {
      setIsEditing(false);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleCancelEdit();
    } else {
      setIsEditing(true);
    }
  };

  const saveProfile = async ({ age, firstName, lastName }: FormValues) => {
    try {
      await setUserLocal({
        ...user,
        age: Number(age),
        firstName,
        lastName,
      });

      await updateUserSync({
        age: Number(age),
        firstName,
        lastName,
      });

      setIsEditing(false);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Profile updated',
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Sync Issue',
        text2: 'Saved locally, but could not sync to server.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2">Account Details</Text>
        {isEditing ? (
          <View style={styles.editContainer}>
            <Button
              styleInner={styles.saveButton}
              onPress={handleSubmit(saveProfile)}
              disabled={isPending}
            >
              Save
            </Button>
            <Button
              styleInner={styles.saveButton}
              variant="outline-gray"
              onPress={toggleEdit}
              disabled={isPending}
            >
              Cancel
            </Button>
          </View>
        ) : (
          <TouchableOpacity onPress={toggleEdit}>
            <Text style={styles.editButton}>Edit Details</Text>
          </TouchableOpacity>
        )}
      </View>
      <UserForm user={user} isEditing={isEditing} methods={methods} />
    </View>
  );
};
