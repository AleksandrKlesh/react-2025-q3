import {
  formReducer,
  submitUncontrolledForm,
  submitHookForm,
} from '../features/formSlice';
import type { FormValues } from '../utils/validation';
import { describe, expect, it } from 'vitest';

describe('formsSlice', () => {
  const mockForm: FormValues = {
    name: 'Alice',
    email: 'alice@example.com',
    age: 25,
    password: '',
    confirmPassword: '',
    gender: 'male',
    acceptedTerms: false,
    country: '',
  };

  it('should return the initial state', () => {
    expect(formReducer(undefined, { type: '' })).toEqual({
      uncontrolled: [],
      hookForm: [],
    });
  });

  it('should handle submitUncontrolledForm', () => {
    const action = submitUncontrolledForm(mockForm);
    const state = formReducer(undefined, action);

    expect(state.uncontrolled).toHaveLength(1);
    expect(state.uncontrolled[0]).toEqual(mockForm);
    expect(state.hookForm).toEqual([]);
  });

  it('should handle submitHookForm', () => {
    const action = submitHookForm(mockForm);
    const state = formReducer(undefined, action);

    expect(state.hookForm).toHaveLength(1);
    expect(state.hookForm[0]).toEqual(mockForm);
    expect(state.uncontrolled).toEqual([]);
  });

  it('should handle multiple submissions correctly', () => {
    const forms = [
      { name: 'Bob', email: 'bob@example.com', age: 30 },
      { name: 'Eve', email: 'eve@example.com', age: 22 },
    ] as FormValues[];

    let state = formReducer(undefined, { type: '' });
    forms.forEach((form) => {
      state = formReducer(state, submitUncontrolledForm(form));
    });

    expect(state.uncontrolled).toHaveLength(2);
    expect(state.uncontrolled).toEqual(forms);
  });
});
