import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import * as qs from 'qs';
import GeoSearch from './GeoSearch';
import PlacesMarkers from './PlacesMarkers';
import FacilityMarkers from './FacilityMarkers';
import AddPlace from './AddPlace';
import UserContext from '../../context/UserContext';
import 'leaflet/dist/leaflet.css';

type MapComponentProps = {
  searchValuesFacilities: string[];
  searchValuesPlaces: string[];
  handleSetCurrentPlaceId: (value: string) => void;
  handleSetCurrentFacility: (facility: any) => void;
  handleSetAddedPlace: (place: any) => void;
};

function MapComponent(props: MapComponentProps) {
  const [placeResults, setPlaceResults] = useState([]);
  const [facilityResults, setFacilityResults] = useState([]);
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    50.04, 19.94,
  ]);

  const isLoggedIn = useContext(UserContext);

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
    axios
      .get(`https://api.foursquare.com/v3/places/search`, {
        params: {
          categories: props.searchValuesPlaces.toString(),
          ll: mapPosition.toString(),
          limit: 20,
        },
        headers: {
          Accept: 'application/json',
          Authorization: import.meta.env.VITE_API_KEY,
        },
      })
      .then((response) => {
        setPlaceResults(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.searchValuesPlaces, mapPosition]);

  useEffect(() => {
    axios
      .get('https://disability-map.azurewebsites.net/Place/GetByRadius', {
        params: {
          LL: mapPosition,
          Radius: 100000,
          PlaceType: 'elevators',
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      })
      .then((response) => {
        console.log(response);
        setFacilityResults(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [mapPosition]);

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
          results={facilityResults}
          handleSetCurrentFacility={props.handleSetCurrentFacility}
        />
        <PlacesMarkers
          results={placeResults}
          handleSetCurrentPlaceId={props.handleSetCurrentPlaceId}
        />
        <div className="map__buttons">
          {isLoggedIn && (
            <AddPlace handleSetAddedPlace={props.handleSetAddedPlace} />
          )}
          <GeoSearch />
        </div>
      </MapContainer>
    </div>
  );
}

export default MapComponent;
