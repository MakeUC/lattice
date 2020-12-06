import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: { 
    primary: {
      main: `#4F3287`
    }
  }
});

export function LatticeThemeProvider({ children }) {
  return  <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
