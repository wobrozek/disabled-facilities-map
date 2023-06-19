import { useState } from 'react';
import { Dialog, TextField, Button, Input, FormControl } from '@mui/material';

type RegisterFormProps = {
  isDialogOpen: boolean;
  handleClose: () => void;
};

function RegisterForm(props: RegisterFormProps) {
  const [helperText, setHelperText] = useState('');
  const [userData, setUserData] = useState<{
    photo: File | null;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    photo: null,
    username: '',
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

  function validatePasswords(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      setHelperText('Passwords do not match');
    }
  }

  function handleSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    validatePasswords(userData.password, userData.confirmPassword);
    console.log(userData);
  }

  return (
    <Dialog open={props.isDialogOpen}>
      <form className="register-form">
        <label htmlFor="photo">Choose profile picture</label>
        <Input id="photo" name="photo" type="file" onChange={uploadPhoto} />
        <FormControl onChange={handleFormChange}>
          <TextField
            required
            id="username"
            name="username"
            label="username"
            value={userData.username}
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
            error={helperText ? true : false}
            id="password"
            name="password"
            label="password"
            type="password"
            value={userData.password}
            helperText={helperText}
            variant="standard"
          />
          <TextField
            required
            error={helperText ? true : false}
            id="confirmPassword"
            name="confirmPassword"
            label="confirm password"
            type="password"
            value={userData.confirmPassword}
            helperText={helperText}
            variant="standard"
          />
        </FormControl>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
      <Button onClick={props.handleClose}>Discard</Button>
    </Dialog>
  );
}

export default RegisterForm;
