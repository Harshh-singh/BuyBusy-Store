import { Navigate, Outlet } from "react-router-dom";
import useAuthDetails from "../../context/authDetailsContext"
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {

    const {authUser} = useAuthDetails();
    const [isLoggedIn, setisLoggedIn] = useState(true);

    useEffect(()=>{
      const loggedInUser = localStorage.getItem('user');
      if(!loggedInUser){
        setisLoggedIn(false)
      }
      // console.log(isLoggedIn);
    },[authUser])
    

    return(
        <>
        {/* {console.log(authUser)} */}
       {isLoggedIn ? (
                <>{children}<Outlet /></>
            ) : (
                <Navigate to="/signin" />
            )}

       </>
    );

    
};

export default ProtectedRoute;