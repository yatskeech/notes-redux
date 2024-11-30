import { ChangeEvent, useState } from 'react';
import { RegisterForm } from '../pages';
import { RegisterActionData } from '../utils/actions';

export function useRegister() {
  const [values, setValues] = useState<RegisterForm>({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [inputErrors, setInputErrors] =
    useState<RegisterActionData['inputErrors']>();
  const [totalError, setTotalError] =
    useState<RegisterActionData['totalError']>();

  const handleInput = (key: keyof RegisterForm) => {
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
