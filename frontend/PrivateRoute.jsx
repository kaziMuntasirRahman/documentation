import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log(location);

  if (loading) {
    return <div className="loading-spinner size-16"></div>
  }

  if (user?.email) {
    return children
  }

  return (
    <Navigate state={location.pathname} to='/signin' replace />
  );
};

export default PrivateRoute;