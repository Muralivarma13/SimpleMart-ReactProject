import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
  const settings = {
   
  className: "",
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 2000, 
  speed: 500,
  pauseOnHover: true
};

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div >
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" alt="" height={'500px'} width={'100%'} style={{objectFit:'cover',objectPosition:"center"}}/>
          
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702" alt="" height={'500px'} width={'100%'} style={{objectFit:'cover',objectPosition:"center"}}/>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="" height={'500px'} width={'100%'} style={{objectFit:'cover',objectPosition:"center"}}/>
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
