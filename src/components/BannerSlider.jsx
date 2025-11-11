import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannerSlider = ({ banners }) => {
  return (
    <section className="w-full my-20 px-4 md:px-8">
      <div
        className="
          w-full 
          h-[150px]      
          sm:h-[250px]  
          md:h-[450px]   
          lg:h-[550px]  
          rounded-3xl 
          overflow-hidden 
          shadow-lg 
          relative
          transition-all 
          duration-300
        "
      >
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full h-full"
        >
          {banners.map((banner, idx) => (
            <SwiperSlide key={idx} className="relative w-full h-full">
              <img
                src={banner.image}
                alt={`Banner ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
             
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-2 md:mb-4">
                  {banner.title}
                </h1>
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl drop-shadow">
                  {banner.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BannerSlider;
