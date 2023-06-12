import { Accordion, AccordionSummary } from '@mui/material';
import PlacesFilter from './PlacesFilter';
import Profile from './Profile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SetStateAction } from 'react';

type SidebarProps = {
  handleSearch: (valuesArray: string[]) => void;
};

function Sidebar(props: SidebarProps) {
  return (
    <div className="sidebar">
      <Profile />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Filtr Places
        </AccordionSummary>
        <PlacesFilter handleSearch={props.handleSearch} />
      </Accordion>
    </div>
  );
}

export default Sidebar;
