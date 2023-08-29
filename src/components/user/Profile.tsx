import { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Avatar, Button } from '@mui/material/';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import UserContext from '../../context/UserContext';
import { Height } from '@mui/icons-material';

type ProfileProps = {
  handleLogIn: (token: string) => void;
};

function Profile(props: ProfileProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState('');
  const [, , removeCookie] = useCookies(['userToken']);

  const isLoggedIn = useContext(UserContext);

  function getUserPhoto(imgPath: string) {
    setUserPhoto(imgPath);
  }

  function toggleRegisterDialog() {
    setIsRegisterOpen((prev) => !prev);
  }

  function toggleLoginDialog() {
    setIsLoginOpen((prev) => !prev);
  }

  function logOut() {
    removeCookie('userToken');
  }

  return (
    <div className="profile">
      {isLoggedIn && (
        <div className="profile__logged-in">
          <Avatar
            sx={{ height: { md: 100 }, width: { md: 100 } }}
            src={userPhoto ? userPhoto : undefined}
          />
          <Button variant="contained" onClick={logOut}>
            Log Out
          </Button>
        </div>
      )}
      {!isLoggedIn && (
        <div className="profile__buttons">
          <Button variant="contained" onClick={toggleLoginDialog}>
            Log In
          </Button>
          <Button variant="contained" onClick={toggleRegisterDialog}>
            Register
          </Button>
        </div>
      )}
      <RegisterForm
        isRegisterOpen={isRegisterOpen}
        handleClose={toggleRegisterDialog}
      />
      <LoginForm
        isLoginOpen={isLoginOpen}
        handleClose={toggleLoginDialog}
        handleLogIn={props.handleLogIn}
        handleGetUserPhoto={getUserPhoto}
      />
    </div>
  );
}

export default Profile;
