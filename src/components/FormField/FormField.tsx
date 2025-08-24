import type React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  id: string;
  name?: string;
  label: string;
  error?: string;
  type?: string;
  options?: { value: string; label: string }[];
  as?: 'input' | 'select';
  list?: string;
  accept?: string;
  register?: UseFormRegisterReturn;
}

function FormField({
  id,
  name,
  label,
  error,
  type = 'text',
  options,
  as = 'input',
  list,
  accept,
  register,
}: FormFieldProps) {
  const inputClasses = 'border p-2 w-full rounded';

  let fieldElement: React.ReactNode;

  if (as === 'select' && options) {
    fieldElement = (
      <select id={id} name={name} className={inputClasses} {...register}>
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else if (type === 'checkbox') {
    fieldElement = (
      <div className="flex items-center gap-2">
        <input id={id} name={name} type="checkbox" {...register} />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  } else {
    fieldElement = (
      <input
        id={id}
        name={name}
        type={type}
        className={inputClasses}
        list={list}
        accept={type === 'file' ? accept : undefined}
        {...register}
      />
    );
  }

  return (
    <div className="mb-4">
      {type !== 'checkbox' && (
        <label htmlFor={id} className="block mb-1">
          {label}
        </label>
      )}
      {fieldElement}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export { FormField };
