import { z } from 'zod';
import { RegisterForm, LoginForm } from '../pages';
import { RegisterActionData, LoginActionData } from './actions';

const registerSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: 'Username must be at least 5 characters long' }),
    email: z.string().email({
      message:
        'Invalid email address. Please ensure you’ve entered a valid email format',
    }),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
      message:
        'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number',
    }),
    confirm: z.string(),
  })
  .refine(({ password, confirm }) => password == confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

const loginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(5, { message: 'Invalid username or email address. Please try again' }),
  password: z
    .string()
    .min(8, { message: 'Invalid password. Please try again' }),
});

export function validateRegisterForm(
  form: RegisterForm
): RegisterActionData['inputErrors'] | null {
  const errors = registerSchema.safeParse(form).error?.format();

  if (!errors) {
    return null;
  }

  return {
    username: errors.username?._errors.join('. '),
    email: errors.email?._errors.join('. '),
    password: errors.password?._errors.join('. '),
    confirm: errors.confirm?._errors.join('. '),
  };
}

export function validateLoginForm(
  form: LoginForm
): LoginActionData['inputErrors'] | null {
  const errors = loginSchema.safeParse(form).error?.format();

  if (!errors) {
    return null;
  }

  return {
    usernameOrEmail: errors.usernameOrEmail?._errors.join('. '),
    password: errors.password?._errors.join('. '),
  };
}

export function isEmail(usernameOrEmail: string) {
  return z.string().email().safeParse(usernameOrEmail).success;
}
