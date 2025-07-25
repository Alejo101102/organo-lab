
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import React, { useState } from 'react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import './PrevencionCarrusel.css';


const tarjetas = [
  {
    icono: '/images/conjuntivitis/Tarjeta1.svg',
    titulo: 'Lávate las manos',
    texto: 'Lávate las manos con agua y jabón frecuentemente, especialmente antes de tocarte los ojos o la cara. Es la medida más eficaz para evitar infecciones.',
  },
  {
    icono: '/images/conjuntivitis/Tarjeta2.svg',
    titulo: 'No compartas objetos',
    texto: 'Evita compartir toallas, almohadas, maquillaje, gafas o pañuelos. Estos objetos pueden acumular virus o bacterias que provocan conjuntivitis.',
  },
  {
    icono: '/images/conjuntivitis/Tarjeta3.svg',
    titulo: 'Limpieza de objetos',
    texto: 'Limpia con regularidad tus lentes, celulares, teclados y otros objetos que tocas a diario. Ayuda a reducir la exposición a posibles contaminantes.',
  },
  {
    icono: '/images/conjuntivitis/Tarjeta4.svg',
    titulo: 'Síntomas de resfriado',
    texto: 'Si tienes gripe o resfriado, evita frotarte los ojos y usa pañuelos desechables. Muchas infecciones respiratorias también pueden afectar los ojos.',
  },
  {
    icono: '/images/conjuntivitis/Tarjeta5.svg',
    titulo: 'Consulta médica',
    texto: 'Suspende el uso de lentes de contacto si tienes molestias. Consulta con un oftalmólogo si los síntomas persisten más de 3 días.',
  },
];

const PrevencionCarrusel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="prevencion-carrusel">
      <Swiper
        modules={[Navigation, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 2.5,
          slideShadows: false,
        }}
        navigation
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // ← ESTA LÍNEA ES CLAVE
        className="swiper-container"
      >

        {tarjetas.map((tarjeta, index) => (
          <SwiperSlide key={index}>
            <div className={`tarjeta-prevencion ${index === activeIndex ? 'activa' : ''}`}>
              <img src={tarjeta.icono} alt="ícono" className="icono-tarjeta" />
              <h5>{tarjeta.titulo}</h5>
              <p>{tarjeta.texto}</p>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default PrevencionCarrusel;
