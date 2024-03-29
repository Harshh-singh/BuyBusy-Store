import { Navigate, Outlet } from "react-router-dom";
import useAuthDetails from "../../context/authDetailsContext"

const ProtectedRoute = ({ children }) => {

    const {authUser} = useAuthDetails();

    return(
        <>
       {authUser? children : <Navigate to='/signin'/>}

       <Outlet/>
       </>
    );

    
};

export default ProtectedRoute;