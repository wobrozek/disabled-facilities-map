import { useState } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import 'leaflet/dist/leaflet.css';
import './styles/App.scss';

function App() {
  const [facilitiesSearch, setFacilitiesSearch] = useState<string[]>([]);
  const [placesSearch, setPlacesSearch] = useState<string[]>([]);

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

  return (
    <div className="App">
      <Sidebar
        handleFacilitySearch={getFacilitySearchValues}
        handlePlacesSearch={getPlacesCategories}
      />
      <MapComponent
        searchValuesFacilities={facilitiesSearch}
        searchValuesPlaces={placesSearch as string[]}
      />
    </div>
  );
}

export default App;
