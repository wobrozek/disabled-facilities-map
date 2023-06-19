import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import RegisterForm from './RegisterForm';

function Profile() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function toggleDialog() {
    setIsDialogOpen((prev) => !prev);
  }

  return (
    <div className="profile">
      <div className="profile__avatar">
        <Avatar sx={{ width: '100px', height: '100px' }} />
      </div>
      <div className="profile__buttons">
        <Button variant="contained">Log In</Button>
        <Button onClick={toggleDialog} variant="outlined">
          Register
        </Button>
      </div>
      <RegisterForm isDialogOpen={isDialogOpen} handleClose={toggleDialog} />
    </div>
  );
}

export default Profile;
