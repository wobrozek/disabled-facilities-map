import Profile from '../user/Profile';
import SidebarAccordion from './SidebarAccordion';

type SidebarProps = {
  handleFacilitySearch: (valuesArray: string[]) => void;
  handlePlacesSearch: (valuesArray: string[]) => void;
  handleLogIn: (token: string) => void;
  addedPlace: any;
  addedReservation: any;
};

function Sidebar(props: SidebarProps) {
  return (
    <div className="sidebar">
      <Profile handleLogIn={props.handleLogIn} />
      <SidebarAccordion
        handleFacilitySearch={props.handleFacilitySearch}
        handlePlacesSearch={props.handlePlacesSearch}
        addedPlace={props.addedPlace}
        addedReservation={props.addedReservation}
      />
    </div>
  );
}

export default Sidebar;
