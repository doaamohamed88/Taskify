import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const loggedIn = useSelector((state) => state.user);

  return loggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
