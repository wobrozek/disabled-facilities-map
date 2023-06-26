import { useContext } from 'react';
import DialogContext from '../context/DialogContext';
import { List, ListItem, IconButton, ListItemText } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';

type MyPlacesProps = {
  handleDeletePlace: (id: string) => void;
};

function MyPlaces(props: MyPlacesProps) {
  const myPlaces = useContext(DialogContext);

  const listOfPlaces = myPlaces.map((place) => {
    return (
      <ListItem key={place.id} id={place.id}>
        <ListItemText primary={place.name} secondary={place.location} />
        <IconButton
          onClick={() => {
            props.handleDeletePlace(place.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
    );
  });

  return (
    <div className="my-places">
      <List>{listOfPlaces}</List>
    </div>
  );
}

export default MyPlaces;
