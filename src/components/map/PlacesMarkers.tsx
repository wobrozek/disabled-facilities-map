import { renderToStaticMarkup } from 'react-dom/server';
import { Marker } from 'react-leaflet';
import { PlaceResult } from '../../types';
import L from 'leaflet';
import { IoLocationSharp } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import {
  IoMdRestaurant,
  IoIosBeer,
  IoIosCart,
  IoMdSchool,
  IoMdMedical,
  IoLogoGameControllerB,
} from 'react-icons/io';

type PlacesMarkersProps = {
  results: PlaceResult[];
  handleSetCurrentPlaceId: (id: string) => void;
};

function PlacesMarkers(props: PlacesMarkersProps) {
  function getIcon(category: number) {
    switch (true) {
      case category >= 13003 && category <= 13025:
        return <IoIosBeer size={40} />;
      case category >= 15000 && category <= 15059:
        return <IoMdMedical size={40} />;
      case category >= 12009 && category <= 12063:
        return <IoMdSchool size={40} />;
      case category >= 17000 && category <= 17146:
        return <IoIosCart size={40} />;
      case category >= 13026 && category <= 13392:
        return <IoMdRestaurant size={40} />;
      case category >= 10000 && category <= 10069:
        return <IoLogoGameControllerB size={40} />;
      default:
        return <IoLocationSharp size={40} />;
    }
  }

  return props.results.map((result: PlaceResult) => {
    const latLngs: [number, number] = [
      result.geocodes.main.latitude,
      result.geocodes.main.longitude,
    ];

    const customPlaceIcon = L.divIcon({
      className: 'custom-icon',
      html: renderToStaticMarkup(
        <IconContext.Provider
          value={{ color: '#7209b7', className: 'custom-icon__icon' }}
        >
          {getIcon(result.categories[0].id)}
        </IconContext.Provider>
      ),
    });

    return (
      <Marker
        key={result.fsq_id}
        position={latLngs}
        icon={customPlaceIcon}
        eventHandlers={{
          click: () => {
            props.handleSetCurrentPlaceId(result.fsq_id);
          },
          keydown: (e) => {
            if (e.originalEvent.key === 'Enter') {
              props.handleSetCurrentPlaceId(result.fsq_id);
            }
          },
        }}
      ></Marker>
    );
  });
}

export default PlacesMarkers;
