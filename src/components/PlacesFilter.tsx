import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  Button,
} from '@mui/material';
import { useState } from 'react';

type PlacesFilterProps = {
  handleSearch: (valuesArray: string[]) => void;
};

function PlacesFilter(props: PlacesFilterProps) {
  const [isOptionsChecked, setIsOptionChecked] = useState({
    restaurants: false,
    shops: false,
    entertainment: false,
    education: false,
    elevators: false,
    restrooms: false,
  });

  const places: string[] = [
    'restaurants',
    'shops',
    'entertainment',
    'education',
  ];
  const facilities: string[] = ['elevators', 'restrooms'];

  const placesCheckboxes = places.map((place) => {
    return (
      <FormControlLabel
        key={place}
        control={
          <Checkbox
            name={place}
            checked={isOptionsChecked[place as keyof typeof isOptionsChecked]}
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
              isOptionsChecked[facility as keyof typeof isOptionsChecked]
            }
          />
        }
        label={facility}
      />
    );
  });

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsOptionChecked((previous) => {
      return {
        ...previous,
        [e.target.name]: e.target.checked,
      };
    });
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const searchValuesArray = Object.entries(isOptionsChecked).reduce(
      (acc: string[], [key, value]) => {
        if (value) {
          acc.push(key);
        }
        return acc;
      },
      []
    );
    props.handleSearch(searchValuesArray);
  }

  return (
    <div className="places-filter">
      <form onSubmit={handleFormSubmit}>
        <FormControl onChange={handleFormChange}>
          <h3 className="places-filter__heading">Places</h3>
          <FormGroup row={true}>{placesCheckboxes}</FormGroup>
          <h3 className="places-filter__heading">Facilities</h3>
          <FormGroup row={true}>{facilitiesCheckboxes}</FormGroup>
          <Button type="submit">Search</Button>
        </FormControl>
      </form>
    </div>
  );
}

export default PlacesFilter;
