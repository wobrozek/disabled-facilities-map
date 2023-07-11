import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import UserContext from './context/UserContext';
import MapComponent from './components/map/MapComponent';
import Sidebar from './components/Sidebar';
import PlaceDialog from './components/PlaceDialog';
import 'leaflet/dist/leaflet.css';
import './styles/App.scss';

function App() {
  const [facilitiesSearch, setFacilitiesSearch] = useState<string[]>([]);
  const [placesSearch, setPlacesSearch] = useState<string[]>([]);
  const [currentDialogId, setCurrentDialogId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('userToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  function handleLogIn() {
    setIsLoggedIn((prev) => !prev);
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

  function getCurrentDialogId(value: string) {
    setCurrentDialogId(value);
  }

  return (
    <div className="app">
      <UserContext.Provider value={isLoggedIn}>
        <Sidebar
          handleFacilitySearch={getFacilitySearchValues}
          handlePlacesSearch={getPlacesCategories}
          handleLogIn={handleLogIn}
          handleSetCurrentDialog={getCurrentDialogId}
        />
        <div className="dialog-map-wrapper">
          {currentDialogId && <PlaceDialog id={currentDialogId} />}
          <MapComponent
            searchValuesFacilities={facilitiesSearch}
            searchValuesPlaces={placesSearch}
            handleSetCurrentDialogId={getCurrentDialogId}
          />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
