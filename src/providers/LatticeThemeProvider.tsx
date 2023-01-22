import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { WrapperComponent } from "../interfaces/wrapper";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: `#FC7F3F`,
    },
  },
});

export const LatticeThemeProvider: WrapperComponent = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
