import { createTheme } from '@mui/material/styles';
import { grey, deepPurple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[700],
    },
  },
  zIndex: {
    modal: 30000,
  },
});

export default theme;
