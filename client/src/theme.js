import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
