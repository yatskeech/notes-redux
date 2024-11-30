import { Link } from 'react-router';
import { Button, Input } from '../components/ui';
import { useRegister } from '../hooks';

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

export function RegisterPage() {
  const { fetcher, values, inputErrors, totalError, handleInput } =
    useRegister();

  return (
    <div className="flex flex-col items-center gap-4 text-fg p-8">
      <h1 className="text-4xl text-center font-bold">Register</h1>
      <fetcher.Form className="flex flex-col items-center gap-2" method="post">
        <Input
          className="w-80"
          type="text"
          name="username"
          placeholder="Username"
          value={values.username}
          errorMessage={inputErrors?.username}
          onChange={handleInput('username')}
        />
        <Input
          className="w-80"
          name="email"
          type="text"
          placeholder="Email"
          value={values.email}
          errorMessage={inputErrors?.email}
          onChange={handleInput('email')}
        />
        <Input
          className="w-80"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          errorMessage={inputErrors?.password}
          onChange={handleInput('password')}
        />
        <Input
          className="w-80"
          type="password"
          name="confirm"
          placeholder="Confirm password"
          value={values.confirm}
          errorMessage={inputErrors?.confirm}
          onChange={handleInput('confirm')}
        />
        {totalError && <p className="text-sm text-red">{totalError}</p>}
        <Button>Sign Up</Button>
        <p className="text-xs">
          Do you have an account?{' '}
          <Link to="/login" className="text-orange underline">
            Sign In
          </Link>
        </p>
      </fetcher.Form>
    </div>
  );
}
