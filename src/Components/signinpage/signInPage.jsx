import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './signin.module.css';
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { signInAsync } from "../../redux/reducers/authenticationReducer";


const Signin = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // signing in the user
    const handlesubmit = async(e) =>{
        e.preventDefault();
        // dispatch the signInAsync action
        try {
          // .unwrap() simplifies the promise returned from async function
          await dispatch(signInAsync({ email, password, navigate })).unwrap();
        } catch (error) {
          console.error(error);
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