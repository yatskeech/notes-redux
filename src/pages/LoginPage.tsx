import { Button, Input } from '../components/ui';
import { Link, useFetcher } from 'react-router';
import { LoginActionData } from '../utils/actions';
import { useLogin } from '../hooks';
import { useEffect } from 'react';

export interface LoginForm {
  usernameOrEmail: string;
  password: string;
}

export function LoginPage() {
  const {
    values,
    inputErrors,
    setInputErrors,
    totalError,
    setTotalError,
    handleInput,
  } = useLogin();

  const fetcher = useFetcher<LoginActionData>();
  const fetcherErrors = fetcher.data;

  useEffect(() => {
    if (fetcherErrors?.inputErrors) {
      setInputErrors(fetcherErrors.inputErrors);
    }

    if (fetcherErrors?.totalError) {
      setTotalError(fetcherErrors.totalError);
    }
  }, [fetcherErrors, setInputErrors, setTotalError]);

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
