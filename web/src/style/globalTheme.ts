import { createTheme, ThemeOptions } from '@mui/material/styles';
import { globalColor } from './color';

const { colorPrimary, colorSecondary } = globalColor;

const themeOptions: ThemeOptions = {
  palette: {
    primary: { main: colorPrimary },
    secondary: { main: colorSecondary },
  },

  typography: {
    fontFamily: '"Lato", "Helvetica", "Arial"',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
};

const globalTheme = createTheme(themeOptions);

export default globalTheme;
