import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { NoPhotography, LocalPhone, LocationOn } from '@mui/icons-material/';
import RatePlace from './RatePlace';
import PlaceReservationDialog from '../PlaceReservationDialog';
import UserContext from '../../context/UserContext';

type FacilityDialogProps = {
  facility: any;
  handleAddReservation: (reservation: any) => void;
};

function FacilityDialog(props: FacilityDialogProps) {
  const [isReservationOpened, setIsReservationOpened] = useState(false);

  const isLoggedIn = useContext(UserContext);

  function closeDialog() {
    setIsReservationOpened(false);
  }

  return (
    <section className="dialog-popup">
      <div className="dialog-popup__photo">
        {props.facility.imagePath ? (
          <img
            className="dialog-popup__img"
            alt=""
            src={`${props.facility.imagePath}`}
          />
        ) : (
          <NoPhotography fontSize="large" />
        )}
      </div>
      <div className="dialog-popup__data-display">
        <h3 className="dialog-popup__title">{props.facility.name}</h3>
        <p className="dialog-popup__paragraph">
          <LocationOn /> {props.facility.adress}
        </p>
        <p className="dialog-popup__paragraph">
          {' '}
          <LocalPhone /> tel: {props.facility.phone}
        </p>
      </div>
      <div className="dialog-popup__user">
        <RatePlace id={props.facility.placeId} />
        {isLoggedIn && (
          <Button
            variant="contained"
            onClick={() => {
              setIsReservationOpened(true);
            }}
          >
            Make Reservation
          </Button>
        )}

        <PlaceReservationDialog
          isReservationOpened={isReservationOpened}
          handleClose={closeDialog}
          handleAddReservation={props.handleAddReservation}
          id={props.facility.placeId}
        />
      </div>
    </section>
  );
}

export default FacilityDialog;
