import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z]/, 'Name must start with an uppercase letter'),
    age: z.number().int().min(1, 'Age must be greater than 0'),
    email: z.email('Invalid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/[a-z]/, 'Password must contain a lowercase letter')
      .regex(/[0-9]/, 'Password must contain a number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),
    confirmPassword: z.string(),
    gender: z.enum(['male', 'female']),
    acceptedTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
    country: z.string().min(1, 'Country is required'),
    picture: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type FormValues = z.infer<typeof formSchema>;
