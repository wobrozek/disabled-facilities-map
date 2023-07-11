import { Accordion, AccordionSummary } from '@mui/material';
import PlacesFilter from './PlacesFilter';
import Profile from './user/Profile';
import MyPlaces from './MyPlaces';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

type SidebarProps = {
  handleFacilitySearch: (valuesArray: string[]) => void;
  handlePlacesSearch: (valuesArray: string[]) => void;
  handleLogIn: () => void;
  handleSetCurrentDialog: (value: string) => void;
};

function Sidebar(props: SidebarProps) {
  const isLoggedIn = useContext(UserContext);

  return (
    <div className="sidebar">
      <Profile handleLogIn={props.handleLogIn} />
      <div className="sidebar__accordion">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h2 className="sidebar__header">Filtr Places</h2>
          </AccordionSummary>
          <PlacesFilter
            handleFacilitySearch={props.handleFacilitySearch}
            handlePlacesSearch={props.handlePlacesSearch}
          />
        </Accordion>
        {isLoggedIn && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h2 className="sidebar__header">My Places</h2>
            </AccordionSummary>
            <MyPlaces />
          </Accordion>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
