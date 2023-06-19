import { Accordion, AccordionSummary } from '@mui/material';
import PlacesFilter from './PlacesFilter';
import Profile from './Profile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type SidebarProps = {
  handleFacilitySearch: (valuesArray: string[]) => void;
  handlePlacesSearch: (valuesArray: string[]) => void;
};

function Sidebar(props: SidebarProps) {
  return (
    <div className="sidebar">
      <Profile />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Filtr Places
        </AccordionSummary>
        <PlacesFilter
          handleFacilitySearch={props.handleFacilitySearch}
          handlePlacesSearch={props.handlePlacesSearch}
        />
      </Accordion>
    </div>
  );
}

export default Sidebar;
