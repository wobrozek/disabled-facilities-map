import { useEffect, useState, useContext } from 'react';
import RatePlace from './RatePlace';
import {
  NoPhotography,
  Language,
  LocalPhone,
  LocationOn,
} from '@mui/icons-material/';

type PlaceDialogProps = {
  id: string;
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

  useEffect(() => {
    async function getPlaceDetails(placeId: string) {
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
      } catch (err) {
        console.error(err);
      }
    }
    getPlaceDetails(props.id);
  }, [props.id]);

  return (
    <section className="dialog-popup">
      {results && (
        <>
          <div className="dialog-popup__photo">
            {results.photos.length > 1 ? (
              <img
                className="dialog-popup__img"
                alt=""
                src={`https://fastly.4sqi.net/img/general/300x150${results.photos[0].suffix}`}
              />
            ) : (
              <NoPhotography fontSize="large" />
            )}
          </div>
          <div className="dialog-popup__data-display">
            <h3 className="dialog-popup__title">{results.name}</h3>
            <p className="dialog-popup__paragraph">
              <LocationOn /> {results.location.formatted_address}
            </p>
            {results.tel && (
              <p className="dialog-popup__paragraph">
                {' '}
                <LocalPhone /> tel: {results.tel}
              </p>
            )}
            {results.website && (
              <a
                className="dialog-popup__link"
                target="_blank"
                href={results.website}
              >
                <Language /> {results.website.slice(7)}
              </a>
            )}
          </div>
          <div className="dialog-popup__user">
            <RatePlace id={props.id} />
          </div>
        </>
      )}
    </section>
  );
}

export default PlaceDialog;
