import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import dayjs from 'dayjs';
import { List, ListItem, IconButton, ListItemText } from '@mui/material/';
import EventBusyIcon from '@mui/icons-material/EventBusy';

function MyReservations() {
  const [userReservations, setUserReservations] = useState([]);
  const [cookies] = useCookies(['userToken']);

  useEffect(() => {
    axios
      .get('https://disability-map.azurewebsites.net/User/Reservations', {
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setUserReservations(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  function cancelReservation(id: string, seq: number) {
    const deleted = userReservations.filter(
      (reservation: any) => reservation.place.placeId !== id
    );
    axios
      .delete('https://disability-map.azurewebsites.net/Reservation', {
        params: {
          seq: seq,
        },
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setUserReservations(deleted);
      })
      .catch((error) => console.log(error));
  }

  const listOfReservations = userReservations.map((reservation: any) => {
    const date = dayjs.unix(reservation.unixTimestamp).format('DD-MM-YY HH:mm');

    return (
      <ListItem
        key={reservation.place.placeId}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              cancelReservation(reservation.place.placeId, reservation.seq);
            }}
          >
            <EventBusyIcon />
          </IconButton>
        }
      >
        <ListItemText
          primary={`${reservation.place.name} ${reservation.place.adress}`}
          secondary={date}
        ></ListItemText>
      </ListItem>
    );
  });

  return (
    <div className="my-reservations">
      {!userReservations.length && `You haven't made any reservations yet`}
      <List>{listOfReservations}</List>
    </div>
  );
}

export default MyReservations;
