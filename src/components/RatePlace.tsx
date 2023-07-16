import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { IconButton } from '@mui/material/';
import {
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from '@mui/icons-material';

type RatePlaceProps = {
  id: string;
};

function RatePlace(props: RatePlaceProps) {
  const [rateValues, setRateValues] = useState(0);
  const [score, setScore] = useState({ likes: 0, dislikes: 0 });
  const [cookies] = useCookies(['userToken']);

  useEffect(() => {
    axios
      .get(`https://disability-map.azurewebsites.net/Score/${props.id}`)
      .then((response) => {
        console.log(response);
        setScore({
          likes: response.data.data.likes,
          dislikes: response.data.data.disLikes,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.id, rateValues]);

  useEffect(() => {
    setRateValues(0);
  }, [props.id]);

  function handleLike() {
    axios
      .put(
        `https://disability-map.azurewebsites.net/Score/upvote/${props.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${cookies.userToken}`,
            Accept: 'text/plain',
          },
        }
      )
      .then((response) => {
        console.log(response);
        rateValues === 0 ? setRateValues(1) : setRateValues(0);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDislike() {
    axios
      .put(
        `https://disability-map.azurewebsites.net/Score/downvote/${props.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${cookies.userToken}`,
            Accept: 'text/plain',
          },
        }
      )
      .then((response) => {
        console.log(response);
        rateValues === 0 ? setRateValues(-1) : setRateValues(0);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="rating">
      <div className="rating__thumb">
        {score.likes}
        <IconButton onClick={handleLike}>
          {rateValues === 1 ? (
            <ThumbUpAlt color="primary" />
          ) : (
            <ThumbUpOffAlt color="primary" />
          )}
        </IconButton>
      </div>
      <div className="rating__thumb">
        <IconButton onClick={handleDislike}>
          {rateValues === -1 ? (
            <ThumbDownAlt color="primary" />
          ) : (
            <ThumbDownOffAlt color="primary" />
          )}
        </IconButton>
        {score.dislikes}
      </div>
    </div>
  );
}

export default RatePlace;
