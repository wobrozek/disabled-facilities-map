import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

function Profile() {
  return (
    <div className="profile">
      <div className="profile__avatar">
        <Avatar sx={{ width: '100px', height: '100px' }} />
      </div>
      <div className="profile__buttons">
        <Button variant="contained">Log In</Button>
        <Button variant="outlined">Register</Button>
      </div>
    </div>
  );
}

export default Profile;
