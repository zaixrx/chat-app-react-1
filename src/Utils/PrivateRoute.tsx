import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthenticationContext from "../Context/AuthenticationContext";

const PrivateRoute = ( { children } : any ) => {
    const { user } = useContext(AuthenticationContext);

    return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;