import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { WrapperComponent } from '../interfaces/wrapper';

const theme = createMuiTheme({
  palette: { 
    primary: {
      main: `#FC7F3F`
    }
  }
});

export const LatticeThemeProvider: WrapperComponent = ({ children }) => {
  return  <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
