import { useState } from 'react';
import { useMap } from 'react-leaflet';
import Button from '@mui/material/Button';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

function GeoSearch() {
  const [userCoordinates, setUserCoordinates] = useState<
    [number, number] | undefined
  >(undefined);

  const map = useMap();

  function searchUserLocation() {
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
    if (userCoordinates) {
      map.flyTo(userCoordinates);
    }
  }

  return (
    <div className="geosearch-button">
      <Button
        variant="contained"
        endIcon={<GpsFixedIcon />}
        onClick={searchUserLocation}
      >
        Locate Me
      </Button>
    </div>
  );
}

export default GeoSearch;
