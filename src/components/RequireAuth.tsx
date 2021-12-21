import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom";
import { AppState } from "../store/reducers"

interface RequireAuthProps {
  children: JSX.Element
}

const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
}) => {
  const isAuthenticated = useSelector(
    (state: AppState) => state.login.isAuthenticated
  );
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;