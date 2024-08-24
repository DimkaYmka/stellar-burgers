import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { getUser, update } from '../../services/slices/user';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(update(formValue));
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        value={formValue.name}
        onChange={handleInputChange}
      />
      <input
        type='email'
        name='email'
        value={formValue.email}
        onChange={handleInputChange}
      />
      <input
        type='password'
        name='password'
        value={formValue.password}
        onChange={handleInputChange}
      />
      <button type='submit' disabled={!isFormChanged}>
        Сохранить
      </button>
      <button onClick={handleCancel}>Отменить</button>
    </form>
  );
};
