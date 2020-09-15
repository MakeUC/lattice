import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: { 
    primary: {
      main: `rgb(129,116,255)`
    }
  }
});

export function LatticeThemeProvider({ children }) {
  return  <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
