import { createTheme, ThemeOptions } from '@mui/material/styles';
import { globalColor } from './color';

const { colorPrimary, colorSecondary } = globalColor;

const themeOptions: ThemeOptions = {
  palette: {
    primary: { main: colorPrimary },
    secondary: { main: colorSecondary },
  },
};

const globalTheme = createTheme(themeOptions);

export default globalTheme;
