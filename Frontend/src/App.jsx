import "./App.css";
import AppRoutes from "./routes/routes";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "./context/ThemeContext";
function App() {
  return (
    <>
    <ThemeProvider>
      <Provider store={store}>
        <AppRoutes />
      </Provider></ThemeProvider>
    </>
  );
}

export default App;
