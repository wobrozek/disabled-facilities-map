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
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axiosConfig from '../../api/axiosConfig';
type RegisterFormProps = {
  isRegisterOpen: boolean;
  handleClose: () => void;
};

function RegisterForm(props: RegisterFormProps) {
  const [helperText, setHelperText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [userData, setUserData] = useState<{
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const registerMutation = useMutation({
    mutationFn: (userData: {
      login: string;
      email: string;
      passwrod: string;
    }) => {
      return axiosConfig.post('/Access/Register/', userData);
    },
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
      const formData = new FormData();
      formData.append('image', files[0]);
      axiosConfig
        .post('https://disability-map.azurewebsites.net/Photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response);
          setPhotoUrl(response.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function closeRegister() {
    setUserData({
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setHelperText('');
    setPhotoUrl('');
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

  async function handleSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const isPasswordValid = validatePasswords(
      userData.password,
      userData.confirmPassword
    );
    if (isPasswordValid) {
      try {
        await registerMutation.mutateAsync({
          login: userData.login,
          email: userData.email,
          passwrod: userData.password,
        });
        closeRegister();
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <Dialog open={props.isRegisterOpen}>
      <Backdrop open={registerMutation.isLoading}>
        <CircularProgress />
      </Backdrop>
      <form className="form">
        <Button
          variant="outlined"
          component="label"
          endIcon={<AddAPhotoIcon />}
        >
          {photoUrl ? `Change Photo` : `Upload Profile picture`}
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
