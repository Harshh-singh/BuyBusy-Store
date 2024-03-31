import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseinit";
import styles from './signup.module.css'
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseinit";
import { doc, setDoc } from "firebase/firestore";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
  
    // creating a new user in auth and db
    const handlesubmit = (e) =>{
    e.preventDefault();

      //creating new user in auth
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

       //creating new user in DB
      setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          userName: name,
          userEmail: email,
          carts: []
      })
     .then(() => {
      toast.success("new Account Created");
      console.log("new user created as"+userCredential);
      navigate('/');   
     })
          
    })
    .catch((error) => {
        toast.error("Failed to create new user")
        console.log(error);
    })


    setName('');
    setEmail('');
    setPassword('');
    }
   

return(
    <div>
      <ToastContainer />
    <div className={styles.signuppage}>
    <h2>Create Account</h2>      
        <form  onSubmit={handlesubmit}>
        {/* <label htmlFor="email">Email</label> */}
        <input
         type="text"
         value={name}
         onChange={(e)=>setName(e.target.value)}
         placeholder="Full Name"/>

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
        <button type="submit">Create Account</button>
      </form>
      <span>Already have an account?
        <NavLink to='/signin'>Login</NavLink>
      </span>
      </div>
    </div>

)
}

export default Signup;