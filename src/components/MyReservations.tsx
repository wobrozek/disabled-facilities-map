import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axiosConfig from '../api/axiosConfig';
import dayjs from 'dayjs';
import { List, ListItem, IconButton, ListItemText } from '@mui/material/';
import EventBusyIcon from '@mui/icons-material/EventBusy';

type MyReservationsProps = {
  addedReservation: any;
};

function MyReservations(props: MyReservationsProps) {
  const [userReservations, setUserReservations] = useState([]);
  const [cookies] = useCookies(['userToken']);

  useEffect(() => {
    axiosConfig
      .get('/User/Reservations', {
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
        },
      })
      .then((response) => {
        setUserReservations(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.addedReservation]);

  function cancelReservation(seq: number) {
    const deleted = userReservations.filter((reservation: any) => {
      return reservation.seq !== seq;
    });

    axiosConfig
      .delete('/Reservation', {
        params: {
          seq: seq,
        },
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
        },
      })
      .then((response) => {
        setUserReservations(deleted);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const actualReservations = userReservations.filter((reservation: any) => {
    return reservation.unixTimestamp > dayjs().unix();
  });

  const listOfReservations = actualReservations.map((reservation: any) => {
    const date = dayjs.unix(reservation.unixTimestamp).format('DD-MM-YY HH:mm');

    return (
      <ListItem
        key={reservation.seq}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              cancelReservation(reservation.seq);
            }}
          >
            <EventBusyIcon />
          </IconButton>
        }
      >
        <ListItemText
          primary={`${reservation.place.name} - ${reservation.place.adress}`}
          secondary={date}
        ></ListItemText>
      </ListItem>
    );
  });

  return (
    <div className="my-reservations">
      <List>{listOfReservations}</List>
    </div>
  );
}

export default MyReservations;
