import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { fileToBase64 } from '../../utils/fileToBase64';
import { formSchema, type FormValues } from '../../utils/validation';
import { submitUncontrolledForm } from '../../features/formSlice';
import { FormField } from '../FormField/FormField';

interface Props {
  onClose: () => void;
}

function UncontrolledForm({ onClose }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries.list);

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const raw: Record<string, unknown> = {};

    formData.forEach((value, key) => {
      raw[key] = value;
    });

    if (raw.age) raw.age = Number(raw.age);
    raw.acceptedTerms = raw.acceptedTerms === 'on';

    const pictureFIle = formData.get('picture') as File;
    if (pictureFIle && pictureFIle.size > 0) {
      raw.picture = await fileToBase64(pictureFIle);
    }

    const result = formSchema.safeParse(raw);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormValues;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    dispatch(submitUncontrolledForm(result.data));
    onClose();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <FormField id="name" name="name" label="Name" error={errors.name} />

      <FormField
        id="age"
        name="age"
        label="Age"
        type="number"
        error={errors.age}
      />

      <FormField
        id="email"
        name="email"
        label="Email"
        type="email"
        error={errors.email}
      />

      <FormField
        id="password"
        name="password"
        label="Password"
        type="password"
        error={errors.password}
      />

      <FormField
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword}
      />

      <FormField
        id="gender"
        name="gender"
        label="Gender"
        as="select"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        error={errors.gender}
      />

      <FormField
        id="country"
        name="country"
        label="Country"
        list="country-options"
        error={errors.country}
      />
      <datalist id="country-options">
        {countries.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <FormField
        id="acceptedTerms"
        name="acceptedTerms"
        type="checkbox"
        label="Accept Terms and Conditions"
        error={errors.acceptedTerms}
      />

      <FormField
        id="picture"
        name="picture"
        label="Upload Picture"
        type="file"
        accept=".png,.jpg,.jpeg"
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

export { UncontrolledForm };
