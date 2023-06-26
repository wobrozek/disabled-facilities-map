import { createTheme } from '@mui/material/styles';
import { grey, deepPurple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: deepPurple[700],
    },
  },
});

export default theme;
