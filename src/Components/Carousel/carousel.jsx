import Slider from 'react-slick';
import styles from './carousel.module.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Carousel(){

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        centerMode: true,
        // centerPadding: '350px' 
      };

    return(
        <Slider {...settings} >
            <div className= {styles.carouselImg}><img src='https://imgs.search.brave.com/Bw36e3sOfSI9aWrpOPJDpDez1bwv7E5PVv1XAlN4LHs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS1jZG4uaHlwYi5z/dC9odHRwczovL2h5/cGViZWFzdC5jb20v/aW1hZ2UvMjAyNC8w/MS9taWxhbi1mYXNo/aW9uLXdlZWstbWVu/cy1mdzI0LXN0cmVl/dC1zdHlsZS0wMDAu/anBnP2ZpdD1tYXgm/Y2JyPTEmcT05MCZ3/PTc1MCZoPTUwMA'  alt= "fashion"/></div>
            <div className= {styles.carouselImg}><img src='https://imgs.search.brave.com/QsnZPHuxsF5B8f4_SxEh91QfgFM81sCC-wFbbp0RP38/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS1jZG4uaHlwYi5z/dC9odHRwczovL2h5/cGViZWFzdC5jb20v/aW1hZ2UvMjAyNC8w/Mi9uZXcteW9yay1m/YXNoaW9uLXdlZWst/ZncyNC1zdHJlZXQt/c3R5bGUtMDAwLmpw/Zz9maXQ9bWF4JmNi/cj0xJnE9OTAmdz03/NTAmaD01MDA'  alt= "fashion"/></div>
           {/* <h2>This is carousel of images</h2> */}
        </Slider>
    )
}

export default Carousel;