import { useState } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import 'leaflet/dist/leaflet.css';
import './styles/App.scss';

function App() {
  const [searchFilterValues, setSearchFilterValues] = useState<string[]>([]);

  function getSearchValues(valuesArray: string[]) {
    setSearchFilterValues(valuesArray);
  }

  return (
    <div className="App">
      <Sidebar handleSearch={getSearchValues} />
      <MapComponent searchValues={searchFilterValues} />
    </div>
  );
}

export default App;
