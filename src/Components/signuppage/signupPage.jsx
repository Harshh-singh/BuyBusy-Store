import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseinit";
import styles from './signup.module.css'
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseinit";
import { addDoc, collection } from "firebase/firestore";

const Signup = () => {
    const[name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handlesubmit = (e) =>{

    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;

      addDoc(collection(db, "users"), {
          id: user.uid,
          userName: name,
          userEmail: email
      })
     .then(() => {
      console.log("new user created as"+userCredential);
      navigate('/');   
     })
          
    })
    .catch((error) => {
        console.log(error);
    })


    setName('');
    setEmail('');
    setPassword('');
    }
   

return(
    <div>
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