import { SyntheticEvent, useState } from 'react';
import { FormControl, RadioGroup, Radio } from '@mui/material/';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

function RatePlace() {
  const [value, setValue] = useState<string | undefined>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((e.target as HTMLInputElement).value);
  };

  return (
    <div className="rating">
      <FormControl>
        <RadioGroup row name="rate-place" value={value} onChange={handleChange}>
          <Radio
            inputProps={{ 'aria-label': 'Like' }}
            icon={<ThumbUpOffAltIcon fontSize="large" color="primary" />}
            checkedIcon={<ThumbUpAltIcon fontSize="large" />}
            value="like"
          />
          <Radio
            inputProps={{ 'aria-label': 'Dislike' }}
            icon={<ThumbDownOffAltIcon fontSize="large" color="primary" />}
            checkedIcon={<ThumbDownAltIcon />}
            value="dislike"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RatePlace;
