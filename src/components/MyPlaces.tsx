import { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, IconButton, ListItemText } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';
import { Cookies } from 'react-cookie';

function MyPlaces() {
  const [userPlaces, setUserPlaces] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('userToken');
    axios
      .get('https://disability-map.azurewebsites.net/User/Places', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setUserPlaces(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const listOfPlaces = userPlaces.map((place: any) => {
    return (
      <ListItem
        key={place.id}
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
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
      {!userPlaces && "You haven't added any places yet"}
      <List>{listOfPlaces}</List>
    </div>
  );
}

export default MyPlaces;
