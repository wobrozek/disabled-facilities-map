import { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Avatar, Button } from '@mui/material/';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import UserContext from '../../context/UserContext';

type ProfileProps = {
  handleLogIn: () => void;
};

function Profile(props: ProfileProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState('');
  const [cookies, , removeCookie] = useCookies(['userToken']);

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
    props.handleLogIn();
  }

  return (
    <div className="profile">
      {isLoggedIn && (
        <div className="profile__logged-in">
          <Avatar
            sx={{ width: '100px', height: '100px' }}
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
