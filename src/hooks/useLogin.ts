import { ChangeEvent, useState } from 'react';
import { LoginForm } from '../pages';
import { LoginActionData } from '../utils/actions';

export function useLogin() {
  const [values, setValues] = useState<LoginForm>({
    usernameOrEmail: '',
    password: '',
  });
  const [inputErrors, setInputErrors] =
    useState<LoginActionData['inputErrors']>();
  const [totalError, setTotalError] = useState<LoginActionData['totalError']>();

  const handleInput = (key: keyof LoginForm) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValues((values) => ({ ...values, [key]: event.target.value }));
      setInputErrors((inputErrors) => ({ ...inputErrors, [key]: '' }));
      setTotalError('');
    };
  };

  return {
    values,
    inputErrors,
    setInputErrors,
    totalError,
    setTotalError,
    handleInput,
  };
}
