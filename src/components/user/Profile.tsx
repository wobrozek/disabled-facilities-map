import { useContext, useState } from 'react';
import { Cookies } from 'react-cookie';
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

  const isLoggedIn = useContext(UserContext);

  function toggleRegisterDialog() {
    setIsRegisterOpen((prev) => !prev);
  }

  function toggleLoginDialog() {
    setIsLoginOpen((prev) => !prev);
  }

  function logOut() {
    const cookies = new Cookies();
    cookies.remove('userToken');
    props.handleLogIn();
  }

  return (
    <div className="profile">
      {isLoggedIn && (
        <div className="profile__logged-in">
          <Avatar sx={{ width: '100px', height: '100px' }} />
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
      />
    </div>
  );
}

export default Profile;
