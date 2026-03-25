import { useAuthStore } from '@/features/authentication/stores/authentication-store';
import { User } from '@/features/authentication/types/user';
import { Button } from '@ui-base/components/button/button';
import { Text } from '@ui-base/components/text/text';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Field } from './field/field';
import { styles } from './styles';

export type FormValues = Pick<User, 'firstName' | 'lastName' | 'email'> & {
  age: string;
};

export const AccountDetailsCard = () => {
  const { user } = useAuthStore(state => state);
  const [isEditing, setIsEditing] = useState(false);
  const methods = useForm<FormValues>({
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

  const saveProfile = (data: FormValues) => {
    console.log(data);
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
            >
              Save
            </Button>
            <Button
              styleInner={styles.saveButton}
              variant="outline-gray"
              onPress={toggleEdit}
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
      <FormProvider {...methods}>
        <Field
          label="Email Address"
          fieldName="email"
          value={user?.email}
          isInput={isEditing}
          isEditable={false}
        />
        <Field
          label="First name"
          fieldName="firstName"
          value={user.firstName}
          isInput={isEditing}
          rules={{
            required: 'First name is required',
          }}
        />
        <Field
          label="Last Name"
          fieldName="lastName"
          value={user.lastName}
          isInput={isEditing}
          rules={{ required: 'Last Name is required' }}
        />
        <Field
          label="Age"
          fieldName="age"
          value={user.age.toString()}
          isInput={isEditing}
          rules={{
            required: 'Age is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Please enter a valid number',
            },
          }}
        />
      </FormProvider>
    </View>
  );
};
