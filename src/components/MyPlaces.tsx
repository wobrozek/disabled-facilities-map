import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { List, ListItem, IconButton, ListItemText } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';

type MyPlacesProps = {
  addedPlace: any;
};

function MyPlaces(props: MyPlacesProps) {
  const [userPlaces, setUserPlaces] = useState([]);
  const [cookies] = useCookies(['userToken']);

  useEffect(() => {
    axios
      .get('https://disability-map.azurewebsites.net/User/Places', {
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setUserPlaces(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.addedPlace]);

  function deletePlace(id: string) {
    const deleted = userPlaces.filter((place: any) => place.placeId !== id);

    axios
      .delete(`https://disability-map.azurewebsites.net/Place/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
        },
      })
      .then(() => {
        setUserPlaces(deleted);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const listOfPlaces = userPlaces.map((place: any) => {
    return (
      <ListItem
        key={place.placeId}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              deletePlace(place.placeId);
            }}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText
          primary={place.name}
          secondary={place.adress}
        ></ListItemText>
      </ListItem>
    );
  });

  return (
    <div className="my-places">
      {!userPlaces.length && "You haven't added any places yet"}
      <List>{listOfPlaces}</List>
    </div>
  );
}

export default MyPlaces;
