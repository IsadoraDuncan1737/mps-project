import { createTheme } from "@mui/material";

const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#739072",
    },
    secondary: {
      main: "#ECE3CE" ,
    },
    error: {
      main: "#FF3F3F",
    },
    success: {
      main: "#00AC1C",
    },
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
          borderRadius: "0",
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
