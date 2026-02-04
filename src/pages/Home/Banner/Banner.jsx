import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import BannerText from './BannerText';

const Banner = () => {
    const slides = [
        {
            img: "https://i.ibb.co/93YRDhR/photo-1499914485622-a88fac536970.jpg",
            title: "Your Dream Career Starts Here",
            subtitle: "Connecting talent with opportunity across the globe."
        },
        {
            img: "https://i.ibb.co/wKyhsPK/photo-1515378791036-0648a3ef77b2.jpg",
            title: "Work From Anywhere",
            subtitle: "Explore thousands of remote opportunities tailored for you."
        },
        {
            img: "https://i.ibb.co/6JsKFhp/photo-1629904853716-f0bc54eea481.jpg",
            title: "Find Your Perfect Match",
            subtitle: "We help you find the job that fits your lifestyle."
        }
    ];

    return (
        <section className='relative w-full overflow-hidden'>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-[450px] md:h-[550px] lg:h-[750px]"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div 
                            className='relative w-full h-full bg-no-repeat bg-cover bg-center'
                            style={{ backgroundImage: `url(${slide.img})` }}
                        >
                            {/* Dark Overlay with Exact Alignment Container */}
                            <div className="absolute inset-0 bg-slate-900/60 flex items-center">
                                {/* Ei container-ta Navbar-er alignment maintain korbe */}
                                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                                    <BannerText title={slide.title} subtitle={slide.subtitle} />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            <style jsx global>{`
                .swiper-button-next, .swiper-button-prev { color: white !important; transform: scale(0.6); }
                .swiper-pagination-bullet-active { background: #6366f1 !important; width: 25px !important; border-radius: 4px; }
            `}</style>
        </section>
    );
};

export default Banner;