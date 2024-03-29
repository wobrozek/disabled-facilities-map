import { useState, useMemo, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker, useMap } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import AddPlaceForm from './AddPlaceForm';
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import { AddLocationAlt, Close, Done } from '@mui/icons-material/';
import { IconContext } from 'react-icons';
import { MdOutlineAddLocationAlt } from 'react-icons/md';

type AddPlaceProps = {
  handleSetAddedPlace: (place: any) => void;
};

function AddPlace(props: AddPlaceProps) {
  const [displayMarker, setDisplayMarker] = useState(false);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const markerRef = useRef<any>();

  const map = useMap();
  const defaultCenter = map.getCenter();

  function toggleMarker() {
    setDisplayMarker((prev) => !prev);
    const CurrentCenter: LatLng = map.getCenter();
    setPosition([CurrentCenter.lat, CurrentCenter.lng]);
  }

  function toggleFormOpen() {
    setDisplayForm((prev) => !prev);
  }

  function closeSubmittedForm() {
    setDisplayForm(false);
    setDisplayDialog(false);
    setDisplayMarker(false);
  }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setPosition([lat, lng]);
          setDisplayDialog(true);
        }
      },
    }),
    []
  );

  const customAddPlaceIcon = L.divIcon({
    className: 'custom-icon',
    html: renderToStaticMarkup(
      <IconContext.Provider
        value={{ color: 'black', className: 'custom-icon__icon' }}
      >
        <MdOutlineAddLocationAlt fontSize={45} />
      </IconContext.Provider>
    ),
  });

  return (
    <>
      <div className="add-place-button">
        <Button
          variant="contained"
          endIcon={<AddLocationAlt />}
          onClick={toggleMarker}
        >
          {displayMarker ? 'Discard' : 'Add Place'}
        </Button>
      </div>
      {displayDialog && (
        <Dialog aria-labelledby="dialog-title" open={displayDialog}>
          <DialogTitle id="dialog-title">Add new Place here?</DialogTitle>
          <DialogActions>
            <IconButton
              aria-label="discard"
              onClick={() => {
                setDisplayDialog(false);
              }}
            >
              <Close />
            </IconButton>
            <IconButton aria-label="add" onClick={toggleFormOpen}>
              <Done />
            </IconButton>
          </DialogActions>
        </Dialog>
      )}
      <AddPlaceForm
        position={position}
        isOpen={displayForm}
        handleClose={closeSubmittedForm}
        handleSetAddedPlace={props.handleSetAddedPlace}
      />
      {displayMarker && (
        <Marker
          position={position ? position : defaultCenter}
          eventHandlers={eventHandlers}
          icon={customAddPlaceIcon}
          draggable={true}
          ref={markerRef}
        ></Marker>
      )}
    </>
  );
}

export default AddPlace;
