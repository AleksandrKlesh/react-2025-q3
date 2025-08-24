import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormValues } from '../../utils/validation';
import { FormField } from '../FormField/FormField';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { submitHookForm } from '../../features/formSlice';

interface Props {
  onClose: () => void;
}

function HookForm({ onClose }: Props) {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries.list);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
      password: '',
      confirmPassword: '',
      gender: undefined,
      acceptedTerms: false,
      country: '',
      picture: undefined,
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: FormValues) => {
    dispatch(submitHookForm(data));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        id="name"
        label="Name"
        register={register('name')}
        error={errors.name?.message}
      />

      <FormField
        id="age"
        label="Age"
        type="number"
        register={register('age')}
        error={errors.age?.message}
      />

      <FormField
        id="email"
        label="Email"
        type="email"
        register={register('email')}
        error={errors.email?.message}
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        register={register('password')}
        error={errors.password?.message}
      />

      <FormField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        register={register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <FormField
        id="gender"
        label="Gender"
        as="select"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        register={register('gender')}
        error={errors.gender?.message}
      />

      <FormField
        id="country"
        label="Country"
        as="select"
        options={countries.map((c) => ({ value: c, label: c }))}
        register={register('country')}
        error={errors.country?.message}
      />

      <FormField
        id="acceptedTerms"
        label="Accept Terms"
        type="checkbox"
        register={register('acceptedTerms')}
        error={errors.acceptedTerms?.message}
      />

      <FormField
        id="picture"
        label="Upload Picture"
        type="file"
        accept=".png,.jpg,.jpeg"
        register={register('picture')}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export { HookForm };
