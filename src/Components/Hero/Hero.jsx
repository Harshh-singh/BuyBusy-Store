// import Slider from 'react-slick';
import styles from './Hero.module.css'


function Hero(){

    return(
            
            <div className= {styles.carouselImg}>
                <img src='https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'  alt= "fashion"  className={styles.mainImg}/>
                </div>

    )
}

export default Hero;