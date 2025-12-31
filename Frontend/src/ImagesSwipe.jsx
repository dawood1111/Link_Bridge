import { Swiper, SwiperSlide } from 'swiper/react';
import './ImagesSwipe.css'
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

function ImagesSwiperTest() {
    const images = ['image1', 'image2', 'image3'];
    
    return (
        <Swiper slidesPerView={1} spaceBetween={10} navigation={true} modules={[Navigation]} className='ImagesStyle'>
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                    {img}
                    Dawood Adel Dawood Jabber
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default ImagesSwiperTest;