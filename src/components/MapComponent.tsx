import { useEffect, useState, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { Place } from '../types';
import PlaceDialog from './PlaceDialog';
import locations from '../locations.json';
import 'leaflet/dist/leaflet.css';

type MapComponentProps = {
  searchValuesFacilities: string[];
  searchValuesPlaces: string[];
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

  const placeDialog = useMemo(() => {
    return <PlaceDialog id={currentDialogId} />;
  }, [currentDialogId]);

  const placesMarkers = results.map((result: Place) => {
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
      >
        {currentDialogId === result.fsq_id && placeDialog}
      </Marker>
    );
  });

  const filteredPlaces = locations.filter((location) => {
    return props.searchValuesFacilities.includes(location.type);
  });

  const facilitiesMarkers = filteredPlaces.map((location) => {
    const latLngs: [number, number] = [
      location.coordinates[0],
      location.coordinates[1],
    ];

    return (
      <Marker key={location.id} position={latLngs}>
        <Popup className="popup">
          <h2 className="popup__title">{location.name}</h2>
          <p className="popup__phoneNumber">{location.phoneNumber}</p>
        </Popup>
      </Marker>
    );
  });

  return (
    <div className="map">
      <MapContainer center={[50.04, 19.94]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />
        {facilitiesMarkers}
        {placesMarkers}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
