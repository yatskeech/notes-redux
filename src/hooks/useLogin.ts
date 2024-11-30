import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { LoginForm } from '../pages';
import { LoginActionData } from '../utils/actions';
import { useFetcher, useNavigate } from 'react-router';
import { UserContext } from '../contexts';

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

  const context = useContext(UserContext);
  const navigate = useNavigate();

  const fetcher = useFetcher<LoginActionData>();
  const fetcherData = fetcher.data;

  useEffect(() => {
    if (fetcherData?.inputErrors) {
      setInputErrors(fetcherData.inputErrors);
    }

    if (fetcherData?.totalError) {
      setTotalError(fetcherData.totalError);
    }

    if (fetcherData?.user) {
      context?.setUser(fetcherData.user);
      navigate('/profile', { replace: true });
    }
  }, [context, fetcherData, navigate, setInputErrors, setTotalError]);

  return {
    fetcher,
    values,
    inputErrors,
    totalError,
    handleInput,
  };
}
