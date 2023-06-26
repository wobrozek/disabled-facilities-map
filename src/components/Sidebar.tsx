import { Accordion, AccordionSummary } from '@mui/material';
import PlacesFilter from './PlacesFilter';
import Profile from './Profile';
import MyPlaces from './MyPlaces';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type SidebarProps = {
  handleFacilitySearch: (valuesArray: string[]) => void;
  handlePlacesSearch: (valuesArray: string[]) => void;
  handleDeletePlace: (id: string) => void;
};

function Sidebar(props: SidebarProps) {
  return (
    <div className="sidebar">
      <Profile />
      <div className="sidebar__accordion">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Filtr Places
          </AccordionSummary>
          <PlacesFilter
            handleFacilitySearch={props.handleFacilitySearch}
            handlePlacesSearch={props.handlePlacesSearch}
          />
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            My Places
          </AccordionSummary>
          <MyPlaces handleDeletePlace={props.handleDeletePlace} />
        </Accordion>
      </div>
    </div>
  );
}

export default Sidebar;
