import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/routes";
import store from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
function App() {
  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={3000} className="" />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
