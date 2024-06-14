import { Navigate, Outlet } from "react-router-dom";
// import useAuthDetails from "../../context/authDetailsContext"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {

    // const {authUser} = useAuthDetails();
    const [isLoggedIn, setisLoggedIn] = useState(true);
    const authUser = useSelector((state) => state.authenticationReducer.authUser);
    // const isAuthenticated = useSelector((state) => state.authenticationReducer.isAuthenticated);

    useEffect(()=>{
      const loggedInUser = localStorage.getItem('user');
      if(!loggedInUser){
        setisLoggedIn(false)
      }
      // console.log(isLoggedIn);
    },[authUser])
    

    return(
        <>
       {isLoggedIn ? (
                <>{children}<Outlet /></>
            ) : (
                <Navigate to="/signin" />
            )}

       </>
    );

    
};

export default ProtectedRoute;