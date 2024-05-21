import { Navigate } from "react-router-dom";
import { isLoggedIn, validRole } from "../utils/login";

export const PrivateRoute = ({children,role = ""}) => {
    return (
    <> 
        {isLoggedIn() && validRole(role) ? (
            children
        ) : isLoggedIn() && !validRole(role) ? (
        <Navigate replace to= "/admin/profile" />
    
         ): (
            <Navigate replace to="/login"/>

        )}

        </>

        );
    };
    
