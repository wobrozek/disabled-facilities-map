import { useState } from 'react';
import { Dialog, TextField, Button, FormControl } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios';

type RegisterFormProps = {
  isRegisterOpen: boolean;
  handleClose: () => void;
};

function RegisterForm(props: RegisterFormProps) {
  const [helperText, setHelperText] = useState('');
  const [userData, setUserData] = useState<{
    photo: File | null;
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    photo: null,
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHelperText('');
    setUserData((previous) => {
      return {
        ...previous,
        [e.target.name]: e.target.value,
      };
    });
  }

  function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target?.files;
    if (files && files.length > 0) {
      setUserData((previous) => ({
        ...previous,
        photo: files[0],
      }));
    }
  }

  function closeRegister() {
    setUserData({
      photo: null,
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    props.handleClose();
  }

  function validatePasswords(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      setHelperText('Passwords do not match');
      return false;
    } else if (password.length < 6) {
      setHelperText('password should be at least 6 characters');
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const isPasswordValid = validatePasswords(
      userData.password,
      userData.confirmPassword
    );
    if (isPasswordValid) {
      let isRequestSuccessfull;
      axios
        .post('https://disability-map.azurewebsites.net/Access/Register', {
          login: userData.login,
          email: userData.email,
          password: userData.password,
        })
        .then((response) => {
          console.log(response.data);
          setHelperText('');
          isRequestSuccessfull = true;
          props.handleClose();
        })
        .catch((error) => {
          console.error(error);
          setHelperText(error.response.data.message);
          isRequestSuccessfull = false;
        });
      if (isRequestSuccessfull) {
        axios
          .post(
            'https://disability-map.azurewebsites.net/Photo',
            userData.photo
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
            setHelperText(error.response.data.message);
          });
      }
    }
  }

  return (
    <Dialog open={props.isRegisterOpen}>
      <form className="form">
        <Button
          variant="outlined"
          component="label"
          endIcon={<AddAPhotoIcon />}
        >
          {userData.photo ? userData.photo.name : `Upload Profile picture`}
          <input type="file" onChange={uploadPhoto} hidden />
        </Button>
        <FormControl className="form__text-fields" onChange={handleFormChange}>
          <TextField
            required
            id="login"
            name="login"
            label="username"
            value={userData.login}
            variant="standard"
          />
          <TextField
            required
            id="email"
            name="email"
            label="email"
            type="email"
            value={userData.email}
            variant="standard"
          />
          <TextField
            required
            id="password"
            name="password"
            label="password"
            type="password"
            value={userData.password}
            variant="standard"
          />
          <TextField
            required
            id="confirmPassword"
            name="confirmPassword"
            label="confirm password"
            type="password"
            value={userData.confirmPassword}
            variant="standard"
          />
          <p className="form__error-msg">{helperText}</p>
        </FormControl>
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <Button type="button" onClick={closeRegister}>
          Discard
        </Button>
      </form>
    </Dialog>
  );
}

export default RegisterForm;
