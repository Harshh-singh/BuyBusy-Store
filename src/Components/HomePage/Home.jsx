import styles from './home.module.css';
import Hero from "../Hero/Hero";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import useProduct from '../../context/productContext';

function Home(){

    const {filterProducts} = useProduct();

    return(<>
        <ToastContainer/>
        <div className={styles.homePage}>
        {/* <h1>This is Home Page</h1> */}
        <Hero/>

        <div className={styles.categories}>

            <div className={styles.category}>
                <NavLink to="/products">
                <h2>Men's wear</h2>
                <span>Explore Men's fashion</span>
                </NavLink>
            </div>

            <div className={styles.category}>
            <NavLink to="/products">
                <h2>Women's wear</h2>
                <span>Explore Girls's fashion</span>
                </NavLink>
            </div>

            
            <div className={styles.category}>
            <NavLink to="/products">
            <h2>Jewelery</h2>
            <span>Explore Jewelery</span>     
            </NavLink>      
            </div>
            
           
            <div className={styles.category}>
            <NavLink to="/products">
            <h2>Electronics</h2>
            <span>Explore Electronics</span>
            </NavLink>
            </div>
            

            <div className={styles.exploreAll} >
             <NavLink to="/products">
                <img src="https://cdn-icons-png.flaticon.com/128/8213/8213451.png" alt="" />
                <span>See All</span>
                </NavLink>
            </div>
            
        </div>

        </div>
        </>
        
       
    )
}

export default Home;