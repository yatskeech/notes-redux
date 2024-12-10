import { ChangeEvent, useEffect, useState } from 'react';
import { RegisterForm } from '../pages';
import { RegisterActionData } from '../utils/actions';
import { useFetcher, useNavigate } from 'react-router';
import { useAppDispatch } from '../redux/store';
import { setUserAction } from '../redux/user';

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetcher = useFetcher<RegisterActionData>();
  const fetcherData = fetcher.data;

  useEffect(() => {
    if (fetcherData?.inputErrors) {
      setInputErrors(fetcherData.inputErrors);
    }

    if (fetcherData?.totalError) {
      setTotalError(fetcherData.totalError);
    }

    if (fetcherData?.user) {
      dispatch(setUserAction(fetcherData.user));
      navigate('/', { replace: true });
    }
  }, [fetcherData, navigate, setInputErrors, setTotalError]);

  return {
    fetcher,
    values,
    inputErrors,
    totalError,
    handleInput,
  };
}
