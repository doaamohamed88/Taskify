import { RouterProvider } from "react-router";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import "./styles/App.css";
import { routes } from "./routes/routes";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
