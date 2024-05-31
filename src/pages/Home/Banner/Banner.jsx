import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import BannerText from './BannerText';


const Banner = () => {


    const backgroundImageUrl1 = "https://i.ibb.co/93YRDhR/photo-1499914485622-a88fac536970-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg";

    const backgroundImageUrl2 = "https://i.ibb.co/wKyhsPK/photo-1515378791036-0648a3ef77b2-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg";

    const backgroundImageUrl3 = "https://i.ibb.co/6JsKFhp/photo-1629904853716-f0bc54eea481-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg";



    const backgroud1 = {
        backgroundImage: `url(${backgroundImageUrl1})`,

    }; const backgroud2 = {
        backgroundImage: `url(${backgroundImageUrl2})`,

    }; const backgroud3 = {
        backgroundImage: `url(${backgroundImageUrl3})`,

    };


    return (
        <div className=''>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >

                <SwiperSlide>
                    <div style={backgroud1} className='brightness-[85%] bg-no-repeat bg-cover bg-center lg:h-[600px] '>
                        {
                            <BannerText></BannerText>
                        }
                    </div>

                </SwiperSlide>

                <SwiperSlide>
                    <div style={backgroud2} className=' brightness-[85%] bg-no-repeat bg-cover bg-center lg:h-[600px]'>
                        {
                            <BannerText></BannerText>
                        }
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div style={backgroud3} className='brightness-[85%] bg-no-repeat bg-cover bg-center lg:h-[600px]'>
                        {
                            <BannerText></BannerText>
                        }
                    </div>
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default Banner;