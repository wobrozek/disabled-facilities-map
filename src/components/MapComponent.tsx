import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { PlaceResult } from '../types';
import PlaceDialog from './PlaceDialog';
import FacilityMarkers from './FacilityMarkers';

type MapComponentProps = {
  searchValuesFacilities: string[];
  searchValuesPlaces: string[];
  handleAddToFavorites: (place: {
    id: string;
    name: string;
    location: string;
  }) => void;
  userCoordinates: [number, number] | undefined;
};

function MapComponent(props: MapComponentProps) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDialogId, setCurrentDialogId] = useState<string>('');
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
      setIsLoading(true);
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
        setResults(data.results);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
    placeSearch(props.searchValuesPlaces, mapPosition);
  }, [props.searchValuesPlaces, mapPosition]);

  const placesMarkers = results.map((result: PlaceResult) => {
    const latLngs: [number, number] = [
      result.geocodes.main.latitude,
      result.geocodes.main.longitude,
    ];

    return (
      <Marker
        key={result.fsq_id}
        position={latLngs}
        eventHandlers={{
          click: () => {
            setCurrentDialogId(result.fsq_id);
          },
        }}
      ></Marker>
    );
  });

  console.log(props.userCoordinates);
  return (
    <div className="map">
      <MapContainer
        center={
          props.userCoordinates ? props.userCoordinates : [50.049683, 19.944544]
        }
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />
        <FacilityMarkers
          searchValuesFacilities={props.searchValuesFacilities}
        />
        <PlaceDialog
          id={currentDialogId}
          handleAddToFavorites={props.handleAddToFavorites}
        />
        {placesMarkers}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
