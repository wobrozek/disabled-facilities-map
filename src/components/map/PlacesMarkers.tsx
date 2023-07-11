import { renderToStaticMarkup } from 'react-dom/server';
import { Marker } from 'react-leaflet';
import { PlaceResult } from '../../types';
import L from 'leaflet';
import { IoLocationSharp } from 'react-icons/io5';
import { IconContext } from 'react-icons';

type PlacesMarkersProps = {
  results: PlaceResult[];
  handleSetCurrentDialogId: (id: string) => void;
};

function PlacesMarkers(props: PlacesMarkersProps) {
  const customPlaceIcon = L.divIcon({
    className: 'custom-icon',
    html: renderToStaticMarkup(
      <IconContext.Provider
        value={{ color: '#7209b7', className: 'custom-icon__icon' }}
      >
        <IoLocationSharp fontSize={45} />
      </IconContext.Provider>
    ),
  });

  return props.results.map((result: PlaceResult) => {
    const latLngs: [number, number] = [
      result.geocodes.main.latitude,
      result.geocodes.main.longitude,
    ];

    return (
      <Marker
        key={result.fsq_id}
        position={latLngs}
        icon={customPlaceIcon}
        eventHandlers={{
          click: () => {
            props.handleSetCurrentDialogId(result.fsq_id);
          },
          keydown: (e) => {
            if (e.originalEvent.key === 'Enter') {
              props.handleSetCurrentDialogId(result.fsq_id);
            }
          },
        }}
      ></Marker>
    );
  });
}

export default PlacesMarkers;
