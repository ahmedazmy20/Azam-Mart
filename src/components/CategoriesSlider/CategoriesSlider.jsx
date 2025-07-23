import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { motion as _motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../apis/categories";

export default function CategoriesSlider() {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <>
      <_motion.div
        initial={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className='mt-10'
      >
        {data?.data.data.length > 0 && (
          <Swiper
            modules={[EffectCoverflow, Autoplay]}
            effect='coverflow'
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              760: {
                slidesPerView: 3,
              },
            }}
            spaceBetween={0}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 5,
              slideShadows: true,
            }}
          >
            {data?.data?.data.map((category, index) => (
              <SwiperSlide key={index}>
                <div className='flex flex-col items-center'>
                  <img
                    className='w-[150px] h-[160px] object-cover'
                    src={category.image}
                    alt={category.name}
                  />
                  <h5>{category.name}</h5>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </_motion.div>
    </>
  );
}
