import { User } from '@/types/user';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { FormValues } from '../account-details';
import { Field } from './field/field';

type UserFormProps = {
  isEditing: boolean;
  methods: UseFormReturn<FormValues, unknown, FormValues>;
  user: User;
};

export const UserForm = ({ user, isEditing, methods }: UserFormProps) => (
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
);
