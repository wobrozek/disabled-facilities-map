import { createTheme } from '@mui/material/styles';
import { grey, deepPurple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[700],
    },
    secondary: {
      main: grey[900],
    },
  },
  zIndex: {
    modal: 900000,
    drawer: 900000,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
