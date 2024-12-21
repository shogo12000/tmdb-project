import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useNavigate} from "react-router-dom";
 


const CheckToken = ({ children }) => {
  const { tokenValidate } = useContext(AuthContext);
  if (!tokenValidate) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default CheckToken