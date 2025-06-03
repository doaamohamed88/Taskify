import "./App.css";
import AppRoutes from "./routes/routes";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </>
  );
}

export default App;
