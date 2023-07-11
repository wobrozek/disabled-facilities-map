import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import GeoSearch from './GeoSearch';
import PlacesMarkers from './PlacesMarkers';
import FacilityMarkers from './FacilityMarkers';
import AddPlace from './AddPlace';

type MapComponentProps = {
  searchValuesFacilities: string[];
  searchValuesPlaces: string[];
  handleSetCurrentDialogId: (value: string) => void;
};

function MapComponent(props: MapComponentProps) {
  const [placeResults, setPlaceResults] = useState([]);
  const [facilityResults, setFacilityResults] = useState([]);
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    50.04, 19.94,
  ]);

  const MapEvents = () => {
    useMapEvents({
      moveend(e) {
        const latLng = e.target.getCenter();
        setMapPosition([latLng.lat, latLng.lng]);
      },
    });
    return false;
  };

  useEffect(() => {
    async function placeSearch(
      searchCategories: string[],
      currentPosition: [number, number]
    ) {
      try {
        const searchParams = new URLSearchParams({
          categories: searchCategories.toString(),
          ll: currentPosition.toString(),
          limit: '20',
          sort: 'DISTANCE',
        });
        const results = await fetch(
          `https://api.foursquare.com/v3/places/search?${searchParams}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: import.meta.env.VITE_API_KEY,
            },
          }
        );
        const data = await results.json();
        setPlaceResults(data.results);
      } catch (err) {
        console.error(err);
      }
    }
    placeSearch(props.searchValuesPlaces, mapPosition);
  }, [props.searchValuesPlaces, mapPosition]);

  return (
    <div className="map">
      <MapContainer
        center={[50.049683, 19.944544]}
        zoom={13}
        scrollWheelZoom={false}
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />
        <FacilityMarkers
          searchValuesFacilities={props.searchValuesFacilities}
        />
        <PlacesMarkers
          results={placeResults}
          handleSetCurrentDialogId={props.handleSetCurrentDialogId}
        />
        <AddPlace />
        <GeoSearch />
      </MapContainer>
    </div>
  );
}

export default MapComponent;
