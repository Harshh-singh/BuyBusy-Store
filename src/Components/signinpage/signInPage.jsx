import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseinit";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './signin.module.css';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // signing in the user
    const handlesubmit = async(e) =>{

        e.preventDefault();
      try{
        // sign in user with email and password 
       await signInWithEmailAndPassword(auth, email, password)
        toast.success("Sign in successfully")
        setTimeout(() => {
          navigate('/cart');
      }, 1000); 
      }
       catch(error) {
        toast.error("Invalid Email or password");
       }    
        
        setEmail('');
        setPassword('');
        }
    
return(

    <div>
      <ToastContainer/>
    <div className={styles.signinpage}>
    <h2>Sign In</h2>      
        <form  onSubmit={handlesubmit}>

        <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"/>

        <input
         type="password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)} 
         placeholder="Password"/>

        <button type="submit">Sign In</button>
      </form>
        <NavLink to='/signup'>Create an Account</NavLink>
      </div>
    </div>
)
}

export default Signin;