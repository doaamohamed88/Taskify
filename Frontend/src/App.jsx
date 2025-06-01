import { RouterProvider } from "react-router";
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
