import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    h1: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    h2: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    h3: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    h4: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    h5: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    h6: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    body1: {
      fontSize: "12px",
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
  },
  palette: {
    primary: {
      main: "#005792",
    },
    secondary: {
      main: "#53CDE2",
    },
    info: {
      main: "#D1F4FA",
    },
    success: {
      main: "#EDF9FC",
    },
    background: {
      default: "#ffffff",
    },
    error: {
      main: "#AD3B4F",
    },
    warning: {
      main: "#FFE600",
    },
  },
});

export default theme;
