import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#0052CC',
    },
    secondary: {
      main: '#6C757D',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, Helvetica, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});
