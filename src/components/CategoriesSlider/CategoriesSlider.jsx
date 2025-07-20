import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function CategoriesSlider() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  // console.log(data?.data.data);

  return (
    <>
      <div className='mt-10'>
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
      </div>
    </>
  );
}
