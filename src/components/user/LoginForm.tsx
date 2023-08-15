import { useState } from 'react';
import { useMutation } from 'react-query';
import {
  Dialog,
  TextField,
  Button,
  FormControl,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import axiosConfig from '../../api/axiosConfig';

type LoginForm = {
  isLoginOpen: boolean;
  handleClose: () => void;
  handleLogIn: (token: string) => void;
  handleGetUserPhoto: (imgPath: string) => void;
};

function LoginForm(props: LoginForm) {
  const [userAuth, setUserAuth] = useState<{ login: string; password: string }>(
    {
      login: '',
      password: '',
    }
  );
  const [helperText, setHelperText] = useState('');

  const loginMutation = useMutation({
    mutationFn: (userData: { login: string; password: string }) => {
      return axiosConfig.post('/Access/Login/', userData);
    },
    onSuccess: (data) => {
      console.log(data);
      props.handleClose();
      setHelperText('');
      setUserAuth({
        login: '',
        password: '',
      });
      props.handleLogIn(data.data.data.token);
      props.handleGetUserPhoto(data.data.data.imagePath);
    },
    onError: (error: any) => {
      console.error(error);
      setHelperText(error.response.data.message);
    },
  });

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserAuth((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function submitForm(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    loginMutation.mutate(userAuth);
  }

  return (
    <Dialog open={props.isLoginOpen}>
      <Backdrop open={loginMutation.isLoading}>
        <CircularProgress />
      </Backdrop>
      <form className="form">
        <FormControl className="form__text-fields" onChange={handleFormChange}>
          <TextField
            required
            label="login"
            name="login"
            value={userAuth.login}
          />
          <TextField
            required
            type="password"
            label="password"
            name="password"
            value={userAuth.password}
          />
          <p className="form__error-msg">{helperText}</p>
        </FormControl>
        <Button
          disabled={loginMutation.isLoading}
          variant="contained"
          type="submit"
          onClick={submitForm}
        >
          Log In
        </Button>
        <Button
          disabled={loginMutation.isLoading}
          type="button"
          onClick={props.handleClose}
        >
          Discard
        </Button>
      </form>
    </Dialog>
  );
}

export default LoginForm;
