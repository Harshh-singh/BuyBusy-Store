import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseinit";
//creating new context
const AuthDetailsContext = createContext();


//consuming the context
export default function useAuthDetails(){

 const context = useContext(AuthDetailsContext);
        
        return context;
};



const AuthDetailsProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null);


    //signing out
    const signout = (e) => {
        try{
            e.preventDefault();
            console.log('signout');
            auth.signOut();
        }catch(err){
            console.log('error signing out' + err);
        }
       
    }

        useEffect(()=>{
            const listen = onAuthStateChanged(auth, (user) => {
                if(user){
                    setAuthUser(user)
                }else{
                    setAuthUser(null)
                }
            })
        }, [])


    return(
        <>
        <AuthDetailsContext.Provider value={{authUser, signout}}>
            {children}
        </AuthDetailsContext.Provider>
        </>
    )

}

export {AuthDetailsProvider};