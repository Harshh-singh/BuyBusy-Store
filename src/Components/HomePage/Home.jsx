import styles from './home.module.css';
import Hero from "../Hero/Hero";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';

function Home(){


    return(
    <>
        <ToastContainer/>
        <div className={styles.homePage}>
        {/* <h1>This is Home Page</h1> */}
        <Hero/>

        <div className={styles.categories}>

        <NavLink to="/products">
            <div className={styles.category}>             
                <h2>Men's wear</h2>
                <span>Explore Men's fashion</span>
            </div>
            </NavLink>

            <NavLink to="/products">
            <div className={styles.category}>
                <h2>Women's wear</h2>
                <span>Explore Girls's fashion</span>
            </div>
            </NavLink>


            <NavLink to="/products">
            <div className={styles.category}>
            <h2>Jewelery</h2>
            <span>Explore Jewelery</span>     
            </div>
            </NavLink>      

            
            <NavLink to="/products">
            <div className={styles.category}>
            <h2>Electronics</h2>
            <span>Explore Electronics</span>
            </div>
            </NavLink>

            
            <NavLink to="/products" style={{backgroundColor: "#353535", display: "flex",width: "10%"}}>
            <div className={styles.exploreAll} >
                <img src="https://cdn-icons-png.flaticon.com/128/8213/8213451.png" alt="" />
                <span>See All</span>
            </div>
            </NavLink>

            
        </div>

        </div>
        </>
        
       
    )
}

export default Home;