import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { WrapperComponent } from '../interfaces/wrapper';

const theme = createMuiTheme({
  palette: { 
    primary: {
      main: `#ff8304`
    }
  },
  typography: {
    fontFamily: `"Press Start 2P", serif`,
    fontSize: 12
  }
});

export const LatticeThemeProvider: WrapperComponent = ({ children }) => {
  return  <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
