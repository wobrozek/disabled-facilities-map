import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { Accordion, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyReservations from '../MyReservations';
import PlacesFilter from '../PlacesFilter';
import MyPlaces from '../MyPlaces';

type SidebarAccordionProps = {
  handleFacilitySearch: (valuesArray: string[]) => void;
  handlePlacesSearch: (valuesArray: string[]) => void;
  addedPlace: any;
  addedReservation: any;
};

function SidebarAccordion(props: SidebarAccordionProps) {
  const isLoggedIn = useContext(UserContext);
  return (
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
        <>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h2 className="sidebar__header">My Places</h2>
            </AccordionSummary>
            <MyPlaces addedPlace={props.addedPlace} />
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h2 className="sidebar__header">My Reservations</h2>
            </AccordionSummary>
            <MyReservations addedReservation={props.addedReservation} />
          </Accordion>
        </>
      )}
    </div>
  );
}

export default SidebarAccordion;
