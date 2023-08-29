import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import MobileNavbar from './components/MobileNavbar';
import UserContext from './context/UserContext';
import MapComponent from './components/map/MapComponent';
import Sidebar from './components/common/Sidebar';
import PlaceDialog from './components/common/PlaceDialog';
import FacilityDialog from './components/common/FacilityDialog';
import 'leaflet/dist/leaflet.css';
import './styles/App.scss';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [facilitiesSearch, setFacilitiesSearch] = useState<string[]>([]);
  const [placesSearch, setPlacesSearch] = useState<string[]>([]);
  const [currentPlaceId, setCurrentPlaceId] = useState('');
  const [currentFacility, setCurrentFacility] = useState(null);
  const [addedPlace, setAddedPlace] = useState<any>();
  const [addedReservation, setAddedReservation] = useState<any>();
  const [cookies, setCookie] = useCookies(['userToken']);

  useEffect(() => {
    if (cookies.userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies]);

  function handleLogIn(token: string) {
    setIsLoggedIn(true);
    setCookie('userToken', token);
  }

  function getFacilitySearchValues(valuesArray: string[]) {
    setFacilitiesSearch(valuesArray);
  }

  function getPlacesCategories(valuesArray: string[]) {
    const categoryIDs = {
      restaurants: '13065',
      shops: '17000',
      bars: '13003',
      entertainment: '10000',
      education: '12013',
      health: '15000',
    };

    const categoriesArray: string[] = valuesArray.map(
      (value) => categoryIDs[value as keyof typeof categoryIDs]
    );
    setPlacesSearch(categoriesArray);
  }

  function getCurrentPlaceId(value: string) {
    setCurrentFacility(null);
    setCurrentPlaceId(value);
  }

  function getCurrentFacility(facility: any) {
    setCurrentPlaceId('');
    setCurrentFacility(facility);
  }

  function addPlace(place: any) {
    setAddedPlace(place);
  }

  function addReservation(reservation: any) {
    setAddedReservation(reservation);
  }

  return (
    <div className="app">
      <UserContext.Provider value={isLoggedIn}>
        <Sidebar
          handleFacilitySearch={getFacilitySearchValues}
          handlePlacesSearch={getPlacesCategories}
          handleLogIn={handleLogIn}
          addedPlace={addedPlace}
          addedReservation={addedReservation}
        />
        <div className="dialog-map-wrapper">
          <MobileNavbar
            handleFacilitySearch={getFacilitySearchValues}
            handlePlacesSearch={getPlacesCategories}
            handleLogIn={handleLogIn}
            addedPlace={addedPlace}
            addedReservation={addedReservation}
          />
          <MapComponent
            searchValuesFacilities={facilitiesSearch}
            searchValuesPlaces={placesSearch}
            handleSetCurrentPlaceId={getCurrentPlaceId}
            handleSetCurrentFacility={getCurrentFacility}
            handleSetAddedPlace={addPlace}
            addedPlace={addedPlace}
          />
          {currentPlaceId && <PlaceDialog id={currentPlaceId} />}
          {currentFacility && (
            <FacilityDialog
              facility={currentFacility}
              handleAddReservation={addReservation}
            />
          )}
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
