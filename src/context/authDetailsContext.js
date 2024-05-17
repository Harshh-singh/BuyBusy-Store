// import { createContext, useContext, useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebaseinit";
// import {toast} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

// //creating new context
// const AuthDetailsContext = createContext();


// //consuming the context
// export default function useAuthDetails(){

//  const context = useContext(AuthDetailsContext);
        
//         return context;
// };



// const AuthDetailsProvider = ({ children }) => {

//     const [authUser, setAuthUser] = useState(null);


//     //signing out
//     const signout = async(e) => {
//         try{
//             e.preventDefault();
//             console.log('signout');
//             await auth.signOut();
//             toast.success("Signed out");
//             localStorage.removeItem('user');
//         }catch(err){
//             toast.error("Error signing out");
//             console.log('error signing out' + err);
//         }
       
//     }

//     // getting logged in user
//         useEffect(()=>{
//             const listen = onAuthStateChanged(auth, (user) => {
//                 if(user){
//                     setAuthUser(user)
//                     localStorage.setItem('user', JSON.stringify(user));
//                 }else{
//                     setAuthUser(null)
//                 }
//             })

//             return() => listen();
//         }, [])


//     return(
//         <>
//         <AuthDetailsContext.Provider value={{authUser, signout}}>
//             {children}
//         </AuthDetailsContext.Provider>
//         </>
//     )

// }

// export {AuthDetailsProvider};