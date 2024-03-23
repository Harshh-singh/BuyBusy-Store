import { NavLink, Outlet } from 'react-router-dom';
import styles from './navbar.module.css';

function Navbar(){
    return(
        <>
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <NavLink to='/'>
                <img src="https://cdn-icons-png.flaticon.com/128/2273/2273106.png" alt="logo" />
                 <span >Busy Buy</span>
                 </NavLink>
            </div>
            <div className={styles.components}>
            <NavLink to= '/'>Home</NavLink>
            <NavLink to= '/products'>Products</NavLink>
            <NavLink to= '/cart'>Cart</NavLink>           
            <NavLink to='/orders'>My Orders</NavLink>
            </div>
            <div className={styles.logout}>
                <NavLink>
                <img src="https://cdn-icons-png.flaticon.com/128/6568/6568636.png" alt="logout" />
               <span> LogOut</span>
               </NavLink>
                </div>
        </div>
        <Outlet/>
    </>
        
    )
    
}

export default Navbar;