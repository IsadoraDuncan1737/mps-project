import { createTheme } from "@mui/material";

const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#ffaf6a",
    },
    secondary: {
      main: "#FFD9B7" ,
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Jost",
          margin: "0",
          padding: "0",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: "Jost",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Jost",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "Jost",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Jost",
          borderRadius: "0",
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
