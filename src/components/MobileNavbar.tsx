import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function MobileNavbar() {
  return (
    <div className="mobile-navbar">
      <IconButton aria-label="menu">
        <MenuIcon color="primary" />
      </IconButton>
    </div>
  );
}

export default MobileNavbar;
