import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import {
  Dialog,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

type AddPlaceFormProps = {
  position: [number, number] | null;
  isOpen: boolean;
  handleClose: () => void;
  handleSetAddedPlace: (place: any) => void;
};

function AddPlaceForm(props: AddPlaceFormProps) {
  const [placeData, setPlaceData] = useState({
    name: '',
    address: '',
    type: '',
    openingHours: '',
    phone: '',
    email: '',
  });
  const [photoUrl, setPhotoUrl] = useState('');
  const [cookies] = useCookies(['userToken']);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPlaceData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSelectChange(e: SelectChangeEvent) {
    setPlaceData((prev) => {
      return {
        ...prev,
        type: e.target.value,
      };
    });
  }

  function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target?.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append('image', files[0]);
      axios
        .post('https://disability-map.azurewebsites.net/Photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response);
          setPhotoUrl(response.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    axios
      .post(
        'https://disability-map.azurewebsites.net/Place',
        {
          name: placeData.name,
          ll: props.position,
          adress: placeData.address,
          openingHours: placeData.openingHours,
          type: placeData.type,
          imagePath: photoUrl,
          phone: placeData.phone,
          email: placeData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.userToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        props.handleSetAddedPlace(response.data.data);
        props.handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Dialog open={props.isOpen}>
      <form className="form">
        <Button variant="outlined" component="label">
          {photoUrl ? 'Change photo' : 'Upload Photo'}
          <input required type="file" onChange={uploadPhoto} hidden />
        </Button>
        <FormControl className="form__text-fields" onChange={handleFormChange}>
          <TextField required label="name" name="name" value={placeData.name} />
          <TextField
            required
            label="adress"
            name="address"
            value={placeData.address}
          />
          <TextField
            required
            label="opening hours"
            name="openingHours"
            value={placeData.openingHours}
          />
          <Select
            required
            value={placeData.type}
            label="type"
            onChange={handleSelectChange}
          >
            <MenuItem value="elevators">elevator</MenuItem>
            <MenuItem value="restrooms">restroom</MenuItem>
            <MenuItem value="blindPlace">blind facility</MenuItem>
          </Select>
          <TextField
            required
            label="phone number"
            name="phone"
            value={placeData.phone}
          />
          <TextField
            required
            label="email"
            name="email"
            value={placeData.email}
          />
        </FormControl>
        <Button variant="contained" type="submit" onClick={submitForm}>
          Add Place
        </Button>
        <Button
          type="button"
          onClick={() => {
            props.handleClose();
          }}
        >
          Discard
        </Button>
      </form>
    </Dialog>
  );
}

export default AddPlaceForm;
