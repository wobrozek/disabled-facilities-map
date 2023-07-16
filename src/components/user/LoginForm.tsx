import { useState } from 'react';
import {
  Dialog,
  TextField,
  Button,
  FormControl,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { Cookies } from 'react-cookie';

type LoginForm = {
  isLoginOpen: boolean;
  handleClose: () => void;
  handleLogIn: () => void;
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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const cookies = new Cookies();
    axios
      .post('https://disability-map.azurewebsites.net/Access/Login', {
        login: userAuth.login,
        password: userAuth.password,
      })
      .then((response) => {
        console.log(response);
        props.handleLogIn();
        props.handleGetUserPhoto(response.data.data.imagePath);
        setHelperText('');
        props.handleClose();
        setIsLoading(false);
        cookies.set('userToken', response.data.data.token);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setHelperText(error.response.data.message);
      });
  }

  return (
    <Dialog open={props.isLoginOpen}>
      <Backdrop open={isLoading}>
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
          disabled={isLoading}
          variant="contained"
          type="submit"
          onClick={submitForm}
        >
          Log In
        </Button>
        <Button disabled={isLoading} type="button" onClick={props.handleClose}>
          Discard
        </Button>
      </form>
    </Dialog>
  );
}

export default LoginForm;
