import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseinit";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './signin.module.css';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handlesubmit = async(e) =>{

        e.preventDefault();
    
       await signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
        console.log(userCredential);
        navigate('/cart');
       })
       .catch((error) => {
        console.log(error);
        navigate('/signup')
       })    
        
        setEmail('');
        setPassword('');
        }
    
return(

    <div>
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