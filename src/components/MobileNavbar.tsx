import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Profile from './user/Profile';
import SidebarAccordion from './common/SidebarAccordion';

type MobileNavbarProps = {
  handleFacilitySearch: (valuesArray: string[]) => void;
  handlePlacesSearch: (valuesArray: string[]) => void;
  handleLogIn: (token: string) => void;
  addedPlace: any;
  addedReservation: any;
};

function MobileNavbar(props: MobileNavbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function toggleDrawer() {
    setIsDrawerOpen((prev) => !prev);
  }

  return (
    <div className="mobile-navbar">
      <Drawer
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: '75%',
            padding: '0.5rem 1rem',
            backgroundColor: '#242222',
          },
        }}
        className="drawer"
        open={isDrawerOpen}
      >
        <div className="drawer__items">
          <IconButton
            onClick={toggleDrawer}
            size="large"
            aria-label="close menu"
          >
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
          <SidebarAccordion
            handleFacilitySearch={props.handleFacilitySearch}
            handlePlacesSearch={props.handlePlacesSearch}
            addedPlace={props.addedPlace}
            addedReservation={props.addedReservation}
          />
        </div>
      </Drawer>
      <AppBar color="secondary" position="static">
        <Toolbar className="mobile-navbar__toolbar">
          <IconButton
            onClick={toggleDrawer}
            size="large"
            edge="start"
            aria-label="menu"
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
          <Profile handleLogIn={props.handleLogIn} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MobileNavbar;
