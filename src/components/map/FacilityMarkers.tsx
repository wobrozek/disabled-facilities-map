import { renderToStaticMarkup } from 'react-dom/server';
import { Marker } from 'react-leaflet';
import locations from '../../locations.json';
import L from 'leaflet';
import { FaWheelchair } from 'react-icons/fa';
import { IconContext } from 'react-icons';

type FacilityMarkersProps = {
  searchValuesFacilities: string[];
};

function FacilityMarkers(props: FacilityMarkersProps) {
  const customFacilityIcon = L.divIcon({
    className: 'custom-icon',
    html: renderToStaticMarkup(
      <IconContext.Provider
        value={{ color: 'green', className: 'custom-icon__icon' }}
      >
        <FaWheelchair fontSize={40} />
      </IconContext.Provider>
    ),
  });

  const filteredPlaces = locations.filter((location) => {
    return props.searchValuesFacilities.includes(location.type);
  });

  return filteredPlaces.map((location) => {
    const latLngs: [number, number] = [
      location.coordinates[0],
      location.coordinates[1],
    ];

    return (
      <Marker
        icon={customFacilityIcon}
        key={location.id}
        position={latLngs}
      ></Marker>
    );
  });
}

export default FacilityMarkers;
