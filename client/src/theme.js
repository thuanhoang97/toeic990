import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16,
  },
  breakpoints: {
    values: {
      pc: 768,
      sm: 600,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        minWidth: 120,
      },
      label: {
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: 500,
      },
      text: {
        textTransform: 'none',
      },
      textPrimary: {
        color: '#fff',
      },
      containedPrimary: {
        backgroundColor: '#4791db',
        '&:hover': {
          backgroundColor: '#1976d2',
        },
      },
    },
  },
});

export default theme;
