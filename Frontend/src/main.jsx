import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

// import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// // Create a custom theme
// const theme = createTheme({
//   palette: {
//     mode: "dark", // Change to "dark" for dark mode
//     primary: {
//       main: "#1976d2",
//     },
//     secondary: {
//       main: "#dc004e",
//     },
//   },
// });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <ThemeProvider theme={theme}> */}
    {/* <CssBaseline /> */}
    <App />
    {/* </ThemeProvider>ظ */}
  </StrictMode>
);