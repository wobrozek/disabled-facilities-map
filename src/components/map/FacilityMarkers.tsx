import { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { FaWheelchair } from 'react-icons/fa';
import { IconContext } from 'react-icons';

type FacilityMarkersProps = {
  results: any[];
  handleSetCurrentFacility: (facility: any) => void;
};

function FacilityMarkers(props: FacilityMarkersProps) {
  const [currentPlaceId, setCurrentPlaceId] = useState('');

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

  function chooseCurrentId(id: string) {
    setCurrentPlaceId(id);

    const choosenPlace = props.results.find(
      (place) => place.placeId === currentPlaceId
    );

    props.handleSetCurrentFacility(choosenPlace);
  }

  return props.results.map((location) => {
    const latLngs: [number, number] = [
      location.ll.latitude,
      location.ll.longitude,
    ];

    return (
      <Marker
        key={location.placeId}
        icon={customFacilityIcon}
        position={latLngs}
        eventHandlers={{
          click: () => {
            chooseCurrentId(location.placeId);
          },
          keydown: (e) => {
            if (e.originalEvent.key === 'Enter') {
              chooseCurrentId(location.placeId);
            }
          },
        }}
      ></Marker>
    );
  });
}

export default FacilityMarkers;
