import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Tailwind blue-600
      light: '#3b82f6', // Tailwind blue-500
      dark: '#1d4ed8', // Tailwind blue-700
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2563eb', // Keeping consistent with primary
      light: '#3b82f6',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9fafb', // Tailwind gray-50
      paper: '#ffffff',
    },
    text: {
      primary: '#111827', // Tailwind gray-900
      secondary: '#4b5563', // Tailwind gray-600
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#111827', // Tailwind gray-900
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#111827',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#111827',
    },
    button: {
      textTransform: 'none', // Matches Tailwind's default
      fontWeight: 500, // medium font weight
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.375rem', // Tailwind rounded-md
          textTransform: 'none',
          padding: '0.5rem 1rem', // Matches Tailwind's px-4 py-2
          fontSize: '0.875rem', // Tailwind text-sm
          fontWeight: 500, // Tailwind font-medium
          '&:focus': {
            boxShadow: '0 0 0 2px #ffffff, 0 0 0 4px #3b82f6', // Tailwind focus ring
          },
        },
        contained: {
          backgroundColor: '#2563eb', // Tailwind blue-600
          '&:hover': {
            backgroundColor: '#1d4ed8', // Tailwind blue-700
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#111827',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // Tailwind shadow-sm
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // Tailwind shadow-sm
          borderRadius: '0.375rem', // Tailwind rounded-md
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.375rem', // Tailwind rounded-md
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 6, // Tailwind rounded
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // shadow-sm
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // shadow
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // shadow-md
    // ... you can add more shadow variants if needed
  ],
});

export default theme;