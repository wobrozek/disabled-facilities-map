import { useContext, useEffect, useState } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { useCookies } from 'react-cookie';
import { IconButton } from '@mui/material/';
import {
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from '@mui/icons-material';
import UserContext from '../../context/UserContext';

type RatePlaceProps = {
  id: string;
};

function RatePlace(props: RatePlaceProps) {
  const [actions, setActions] = useState(0);
  const [rateValues, setRateValues] = useState(0);
  const [score, setScore] = useState({ likes: 0, dislikes: 0 });
  const [cookies] = useCookies(['userToken']);

  const isLoggedIn = useContext(UserContext);

  useEffect(() => {
    axiosConfig
      .get(`/Score/${props.id}`, {
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setScore({
          likes: response.data.data.likes,
          dislikes: response.data.data.disLikes,
        });
        setRateValues(response.data.data.userData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.id, rateValues, cookies.userToken, actions]);

  function handleLike() {
    axiosConfig
      .put(`/Score/upvote/${props.id}`, null, {
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
          Accept: 'text/plain',
        },
      })
      .then((response) => {
        console.log(response);
        actions === 0 ? setActions(1) : setActions(0);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDislike() {
    axiosConfig
      .put(`/Score/downvote/${props.id}`, null, {
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
          Accept: 'text/plain',
        },
      })
      .then((response) => {
        console.log(response);
        actions === 0 ? setActions(-1) : setActions(0);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="rating">
      <div className="rating__thumb">
        {score.likes}
        <IconButton disabled={!isLoggedIn} onClick={handleLike}>
          {rateValues === 1 ? (
            <ThumbUpAlt color="primary" />
          ) : (
            <ThumbUpOffAlt color="primary" />
          )}
        </IconButton>
      </div>
      <div className="rating__thumb">
        <IconButton disabled={!isLoggedIn} onClick={handleDislike}>
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
