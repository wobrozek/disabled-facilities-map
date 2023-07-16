import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  Button,
} from '@mui/material';
import { useState } from 'react';

type PlacesFilterProps = {
  handleFacilitySearch: (valuesArray: string[]) => void;
  handlePlacesSearch: (valuesArray: string[]) => void;
};

function PlacesFilter(props: PlacesFilterProps) {
  const [placesOptions, setPlacesOptions] = useState({
    restaurants: false,
    bars: false,
    shops: false,
    entertainment: false,
    education: false,
    health: false,
  });

  const [facilitiesOptions, setFacilitiesOptions] = useState({
    elevators: false,
    restrooms: false,
  });

  const places: string[] = [
    'restaurants',
    'bars',
    'shops',
    'entertainment',
    'education',
    'health',
  ];
  const facilities: string[] = ['elevators', 'restrooms'];

  const placesCheckboxes = places.map((place) => {
    return (
      <FormControlLabel
        key={place}
        control={
          <Checkbox
            name={place}
            checked={placesOptions[place as keyof typeof placesOptions]}
          />
        }
        label={place}
      />
    );
  });

  const facilitiesCheckboxes = facilities.map((facility) => {
    return (
      <FormControlLabel
        key={facility}
        control={
          <Checkbox
            name={facility}
            checked={
              facilitiesOptions[facility as keyof typeof facilitiesOptions]
            }
          />
        }
        label={facility}
      />
    );
  });

  function handlePlacesFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPlacesOptions((previous) => {
      return {
        ...previous,
        [e.target.name]: e.target.checked,
      };
    });
  }

  function handleFacilitiesFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFacilitiesOptions((previous) => {
      return {
        ...previous,
        [e.target.name]: e.target.checked,
      };
    });
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const facilitieSearchValuesArray = Object.entries(facilitiesOptions).reduce(
      (acc: string[], [key, value]) => {
        if (value) {
          acc.push(key);
        }
        return acc;
      },
      []
    );

    const placesSearchValuesArray = Object.entries(placesOptions).reduce(
      (acc: string[], [key, value]) => {
        if (value) {
          acc.push(key);
        }
        return acc;
      },
      []
    );
    props.handleFacilitySearch(facilitieSearchValuesArray);
    props.handlePlacesSearch(placesSearchValuesArray);
  }

  return (
    <div className="places-filter">
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <h3 className="places-filter__heading">Places</h3>
          <FormGroup onChange={handlePlacesFormChange} row={true}>
            {placesCheckboxes}
          </FormGroup>
          <h3 className="places-filter__heading">Facilities</h3>
          <FormGroup onChange={handleFacilitiesFormChange} row={true}>
            {facilitiesCheckboxes}
          </FormGroup>
          <Button type="submit">Search</Button>
        </FormControl>
      </form>
    </div>
  );
}

export default PlacesFilter;
