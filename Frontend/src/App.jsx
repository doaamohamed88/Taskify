import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/routes";
import store from "./store";
import "./App.css";

function App() {
  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
