import { describe, it, expect } from 'vitest';
import { formSchema, type FormValues } from '../utils/validation';

describe('formSchema validation', () => {
  const baseValidData: FormValues = {
    name: 'John',
    age: 25,
    email: 'john@example.com',
    password: 'Password1!',
    confirmPassword: 'Password1!',
    gender: 'male',
    acceptedTerms: true,
    country: 'USA',
    picture: 'profile.png',
  };

  it('should pass with valid data', () => {
    const result = formSchema.safeParse(baseValidData);
    expect(result.success).toBe(true);
  });

  describe('name field', () => {
    it('should fail if empty', () => {
      const result = formSchema.safeParse({ ...baseValidData, name: '' });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Name is required');
    });

    it('should fail if not starting with uppercase', () => {
      const result = formSchema.safeParse({ ...baseValidData, name: 'john' });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Name must start with an uppercase letter'
      );
    });
  });

  describe('age field', () => {
    it('should fail if age is less than 1', () => {
      const result = formSchema.safeParse({ ...baseValidData, age: 0 });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Age must be greater than 0'
      );
    });
  });

  describe('email field', () => {
    it('should fail if email is invalid', () => {
      const result = formSchema.safeParse({ ...baseValidData, email: 'bad' });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Invalid email');
    });
  });

  describe('password field', () => {
    it('should fail if less than 8 characters', () => {
      const result = formSchema.safeParse({
        ...baseValidData,
        password: 'Pw1!',
        confirmPassword: 'Pw1!',
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Password must be at least 8 characters'
      );
    });

    it('should fail if missing uppercase', () => {
      const result = formSchema.safeParse({
        ...baseValidData,
        password: 'password1!',
        confirmPassword: 'password1!',
      });
      expect(result.success).toBe(false);
      expect(
        result.error?.issues.some(
          (i) => i.message === 'Password must contain an uppercase letter'
        )
      ).toBe(true);
    });

    it('should fail if missing lowercase', () => {
      const result = formSchema.safeParse({
        ...baseValidData,
        password: 'PASSWORD1!',
        confirmPassword: 'PASSWORD1!',
      });
      expect(result.success).toBe(false);
      expect(
        result.error?.issues.some(
          (i) => i.message === 'Password must contain a lowercase letter'
        )
      ).toBe(true);
    });

    it('should fail if missing number', () => {
      const result = formSchema.safeParse({
        ...baseValidData,
        password: 'Password!',
        confirmPassword: 'Password!',
      });
      expect(result.success).toBe(false);
      expect(
        result.error?.issues.some(
          (i) => i.message === 'Password must contain a number'
        )
      ).toBe(true);
    });

    it('should fail if missing special character', () => {
      const result = formSchema.safeParse({
        ...baseValidData,
        password: 'Password1',
        confirmPassword: 'Password1',
      });
      expect(result.success).toBe(false);
      expect(
        result.error?.issues.some(
          (i) => i.message === 'Password must contain a special character'
        )
      ).toBe(true);
    });

    it('should fail if passwords do not match', () => {
      const result = formSchema.safeParse({
        ...baseValidData,
        password: 'Password1!',
        confirmPassword: 'Different1!',
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Passwords must match');
    });
  });

  describe('gender field', () => {
    it('should fail if not in enum', () => {
      const result = formSchema.safeParse({
        ...baseValidData,
        gender: 'other',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('acceptedTerms field', () => {
    it('should fail if not accepted', () => {
      const result = formSchema.safeParse({
        ...baseValidData,
        acceptedTerms: false,
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'You must accept the terms and conditions'
      );
    });
  });

  describe('country field', () => {
    it('should fail if empty', () => {
      const result = formSchema.safeParse({ ...baseValidData, country: '' });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Country is required');
    });
  });

  describe('picture field', () => {
    it('should allow picture to be undefined', () => {
      const result = formSchema.safeParse({
        ...baseValidData,
        picture: undefined,
      });
      expect(result.success).toBe(true);
    });
  });
});
