import styles from './home.module.css';
import Carousel from "../Carousel/carousel";

function Home(){
    return(
        <div className={styles.homePage}>
        {/* <h1>This is Home Page</h1> */}
        <Carousel/>
        </div>
       
    )
}

export default Home;