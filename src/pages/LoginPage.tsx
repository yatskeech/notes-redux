import { Button, Input } from '../components/ui';
import { Link } from 'react-router';
import { useLogin } from '../hooks';

export interface LoginForm {
  usernameOrEmail: string;
  password: string;
}

export function LoginPage() {
  const { fetcher, values, inputErrors, totalError, handleInput } = useLogin();

  return (
    <div className="flex flex-col items-center gap-4 text-fg p-8">
      <h1 className="text-4xl text-center font-bold">Login</h1>
      <fetcher.Form className="flex flex-col items-center gap-2" method="post">
        <Input
          className="w-80"
          type="text"
          name="usernameOrEmail"
          placeholder="Username or email"
          value={values.usernameOrEmail}
          errorMessage={inputErrors?.usernameOrEmail}
          onChange={handleInput('usernameOrEmail')}
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
        {totalError && <p className="text-sm text-red">{totalError}</p>}
        <Button>Sign In</Button>
        <p className="text-xs">
          Don't have an account?{' '}
          <Link to="/register" className="text-orange underline">
            Sign Up
          </Link>
        </p>
      </fetcher.Form>
    </div>
  );
}
