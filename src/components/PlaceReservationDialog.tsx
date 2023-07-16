import { SetStateAction, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Dialog } from '@mui/material';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

type PlaceReservationDialogProps = {
  isReservationOpened: boolean;
  handleClose: () => void;
  id: string;
  handleAddReservation: (reservation: any) => void;
};

function PlaceReservationDialog(props: PlaceReservationDialogProps) {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [cookies] = useCookies(['userToken']);

  function handleDateChange(newDate: SetStateAction<Dayjs | null>) {
    setDate(newDate);
  }

  function closeReservation() {
    props.handleClose();
    setDate(null);
  }

  function submitReservation(e: React.FormEvent) {
    e.preventDefault();
    if (date) {
      const unixTimeStamp = date.unix();
      axios
        .post(
          'https://disability-map.azurewebsites.net/Reservation',
          {
            placeId: props.id,
            unixTimeStamp,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.userToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          props.handleAddReservation(response.data);
          closeReservation();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <Dialog open={props.isReservationOpened}>
      <div className="form">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            ampm={false}
            minDate={dayjs()}
            maxDate={dayjs().add(90, 'day')}
            format="DD/MM/YYYY hh/mm"
            value={date}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <Button type="submit" variant="contained" onClick={submitReservation}>
          Make Reservation
        </Button>
        <Button type="button" variant="outlined" onClick={closeReservation}>
          Discard
        </Button>
      </div>
    </Dialog>
  );
}

export default PlaceReservationDialog;
