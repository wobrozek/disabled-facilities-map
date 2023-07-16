import { useEffect, useState } from 'react';
import axios from 'axios';
import * as qs from 'qs';
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
  const [placesRating, setPlacesRating] = useState([]);

  const ids = props.results.map((location) => location.placeId);

  useEffect(() => {
    axios
      .get('https://disability-map.azurewebsites.net/Score', {
        params: {
          listId: ids,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      })
      .then((response) => {
        console.log(response);
        setPlacesRating(response.data.data);
      })
      .catch((error) => console.error(error));
  }, [props.results]);

  function chooseCurrentId(id: string) {
    const choosenPlace = props.results.find((place) => place.placeId === id);
    props.handleSetCurrentFacility(choosenPlace);
  }

  return props.results.map((location) => {
    const latLngs: [number, number] = [
      location.ll.latitude,
      location.ll.longitude,
    ];

    const placeId = location.placeId;
    const rating = placesRating.find((place: any) => place.placeId === placeId);

    function getIconColor(rating: any) {
      if (rating.likes < rating.disLikes) {
        return 'red';
      } else if (rating.likes > rating.disLikes) {
        return 'green';
      } else {
        return 'orange';
      }
    }

    const iconColor = getIconColor(rating);

    const customFacilityIcon = L.divIcon({
      className: 'custom-icon',
      html: renderToStaticMarkup(
        <IconContext.Provider
          value={{ color: iconColor, className: 'custom-icon__icon' }}
        >
          <FaWheelchair fontSize={40} />
        </IconContext.Provider>
      ),
    });

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
