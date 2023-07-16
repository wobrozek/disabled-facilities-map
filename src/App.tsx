import { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import DialogContext from './context/DialogContext';
import Sidebar from './components/Sidebar';
import 'leaflet/dist/leaflet.css';
import './styles/App.scss';

function App() {
  const [facilitiesSearch, setFacilitiesSearch] = useState<string[]>([]);
  const [placesSearch, setPlacesSearch] = useState<string[]>([]);
  const [myPlaces, setMyPlaces] = useState<
    {
      id: string;
      name: string;
      location: string;
    }[]
  >([]);
  const [userCoordinates, setUserCoordinates] = useState<
    [number, number] | undefined
  >(undefined);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoordinates([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const categoryIds = {
    restaurants: '13065',
    shops: '17000',
    bars: '13003',
    entertainment: '10000',
    education: '12013',
    health: '15000',
  };

  function getFacilitySearchValues(valuesArray: string[]) {
    setFacilitiesSearch(valuesArray);
  }

  function getPlacesCategories(valuesArray: string[]) {
    const categoriesArray: string[] = valuesArray.map(
      (value) => categoryIds[value as keyof typeof categoryIds]
    );
    setPlacesSearch(categoriesArray);
  }

  function addToFavorites(place: {
    id: string;
    name: string;
    location: string;
  }) {
    setMyPlaces((prev) => [...prev, place]);
  }

  function deletePlace(id: string) {
    const updated = myPlaces.filter((place) => place.id !== id);
    setMyPlaces(updated);
  }

  return (
    <>
      <DialogContext.Provider value={myPlaces}>
        <Sidebar
          handleFacilitySearch={getFacilitySearchValues}
          handlePlacesSearch={getPlacesCategories}
          handleDeletePlace={deletePlace}
        />
        <MapComponent
          searchValuesFacilities={facilitiesSearch}
          searchValuesPlaces={placesSearch as string[]}
          handleAddToFavorites={addToFavorites}
          userCoordinates={userCoordinates}
        />
      </DialogContext.Provider>
    </>
  );
}

export default App;
