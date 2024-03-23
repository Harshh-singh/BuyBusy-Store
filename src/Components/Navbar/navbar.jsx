import { NavLink, Outlet } from 'react-router-dom';
import styles from './navbar.module.css';

function Navbar(){
    return(
        <>
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <NavLink to='/'>
                <img src="https://cdn-icons-png.flaticon.com/128/862/862072.png"  alt="logo" />
                 <span >Busy Buy</span>
                 </NavLink>
            </div>
            <div className={styles.components}>
            <NavLink to= '/'
            style={({isActive})=>{
                return{
                    borderBottom: isActive?'3px solid white':"",
                    padding: isActive?'0px 6px 0px 6px':"",
                }
            }}
            >Home</NavLink>

            <NavLink to= '/products'
              style={({isActive})=>{
                return{
                    borderBottom: isActive?'3px solid white':"",
                    padding: isActive?'0px 6px 0px 6px':"",
                }
            }}
            >Products</NavLink>

            <NavLink to= '/cart'
                style={({isActive})=>{
                    return{
                        borderBottom: isActive?'3px solid white':"",
                        padding: isActive?'0px 6px 0px 6px':"",
                    }
                }}
            >Cart</NavLink> 

            <NavLink to='/orders'
                style={({isActive})=>{
                    return{
                        borderBottom: isActive?'3px solid white':"",
                        padding: isActive?'0px 6px 2px 6px':"",
                    }
                }}
            >Orders</NavLink>
            </div>
            <div className={styles.logout}>
                <NavLink>
                <span> LogOut</span>
                <img src="https://cdn-icons-png.flaticon.com/128/10830/10830351.png" alt="logout" />
               
               </NavLink>
                </div>
        </div>
        <Outlet/>
    </>
        
    )
    
}

export default Navbar;