import React from "react";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img4 from "../../assets/images/img4.jpg";
import img5 from "../../assets/images/img5.jpg";
import img6 from "../../assets/images/img6.jpg";
import img7 from "../../assets/images/img7.jpg";
import img8 from "../../assets/images/img8.jpg";
import img9 from "../../assets/images/img9.jpg";
import img10 from "../../assets/images/img10.jpg";
import img11 from "../../assets/images/img11.jpg";
import img12 from "../../assets/images/img12.jpg";
import img13 from "../../assets/images/img13.jpg";
import img14 from "../../assets/images/img14.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img10,
  img12,
  img13,
  img14,
];

export default function MainSlider() {
  return (
    <div className='grid rounded-3xl grid-cols-1 md:grid-cols-12 mt-6 gap-4'>
      {/* Main Slider */}
      <div className='main-slider md:col-span-7 w-full max-w-3xl mx-auto'>
        <Swiper
          modules={[EffectCube, Autoplay]}
          effect='cube'
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          grabCursor={true}
          loop={true}
          className='mySwiper'
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={`slide-${i}`}
                className='w-full h-[300px] md:h-[480px] object-cover rounded-xl'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Side Images - Hidden on small screens */}
      <div className='tow-images hidden md:flex md:col-span-5 flex-col gap-3'>
        <div className='w-[90%] mx-auto'>
          <img
            src={img11}
            alt='book1'
            className='w-full md:h-[130px] lg:h-[180px] xl:h-[230px] object-cover rounded-2xl'
          />
        </div>
        <div className='w-[90%] mx-auto'>
          <img
            src={img9}
            alt='book2'
            className='w-full md:h-[130px] shadow-2xl lg:h-[180px] xl:h-[230px] object-cover rounded-2xl'
          />
        </div>
      </div>
    </div>
  );
}
