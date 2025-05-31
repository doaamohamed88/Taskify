import { RouterProvider } from "react-router";
import "./styles/App.css";
import { routes } from "./routes/routes";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";

function App() {
  return (
    <>
      {/* <RouterProvider router={routes} /> */}
      <AdminDashboard></AdminDashboard>
    </>
  );
}

export default App;
