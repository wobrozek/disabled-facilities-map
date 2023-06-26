import { useEffect, useState, useContext } from 'react';
import { Button } from '@mui/material';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import PlaceDialogSkeleton from './PlaceDialogSkeleton';
import DialogContext from '../context/DialogContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type PlaceDialogProps = {
  id: string;
  handleAddToFavorites: (place: {
    id: string;
    name: string;
    location: string;
  }) => void;
};

type Result = {
  name: string;
  tel: string;
  website: string;
  photos: {
    suffix?: string;
  }[];
  location: {
    formatted_address: string;
  };
};

function PlaceDialog(props: PlaceDialogProps) {
  const [results, setResults] = useState<Result>();
  const [isLoading, setIsLoading] = useState(false);

  const myPlaces = useContext(DialogContext);

  useEffect(() => {
    async function getPlaceDetails(placeId: string) {
      setIsLoading(true);
      try {
        const searchParams = new URLSearchParams({
          fields: 'name,tel,website,photos,location',
        });
        const results = await fetch(
          `https://api.foursquare.com/v3/places/${placeId}?${searchParams}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: import.meta.env.VITE_API_KEY,
            },
          }
        );
        const data = await results.json();
        setResults(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    if (props.id) {
      getPlaceDetails(props.id);
    }
  }, [props.id]);

  function addToFavoritePlaces() {
    props.handleAddToFavorites({
      id: props.id,
      name: results?.name || '',
      location: results?.location.formatted_address || '',
    });
  }

  const checkIfPlaceAdded = (placeId: string) => {
    return myPlaces?.some((place) => place.id === placeId);
  };

  const isPlaceAdded = checkIfPlaceAdded(props.id);

  return (
    <section className="dialog-popup">
      {isLoading && <PlaceDialogSkeleton />}
      {results && (
        <>
          <div className="dialog-popup__photo">
            {results.photos.length > 1 ? (
              <img
                alt=""
                src={`https://fastly.4sqi.net/img/general/300x150${results.photos[0].suffix}`}
              />
            ) : (
              <NoPhotographyIcon fontSize="large" />
            )}
          </div>
          <div className="dialog-popup__data-display">
            <h3 className="dialog-popup__title">{results.name}</h3>
            <p>{results.location.formatted_address}</p>
            {results.tel && <p>tel: {results.tel}</p>}
            <a target="_blank" href={results.website}>
              {results.website}
            </a>
          </div>
          <div className="dialog-popup__user">
            {isPlaceAdded ? (
              <div className="dialog-popup__added">
                Added to Favorites <FavoriteBorderIcon />{' '}
              </div>
            ) : (
              <Button onClick={addToFavoritePlaces} variant="outlined">
                Add to your places
              </Button>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default PlaceDialog;
