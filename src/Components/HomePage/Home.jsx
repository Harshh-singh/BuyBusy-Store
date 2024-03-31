import styles from './home.module.css';
import Carousel from "../Carousel/carousel";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Home(){
    return(<>
        <ToastContainer/>
        <div className={styles.homePage}>
        {/* <h1>This is Home Page</h1> */}
        <Carousel/>
        </div>
        </>
        
       
    )
}

export default Home;