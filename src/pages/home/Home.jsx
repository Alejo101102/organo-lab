import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './Home.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Eye from './models-3d/Eye'

const Home = () => {
  const navigate = useNavigate();
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  
  // Mostrar/ocultar información adicional
  const handleClick = () => {
    setShowMoreInfo(!showMoreInfo);
  };
  
  return (
    <>
    <div className={`home-container ${showMoreInfo ? 'expanded' : ''}`}>
      <div className="home-model-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, -4]} intensity={1} />
          <OrbitControls target={[0, 0, 0]} autoRotate autoRotateSpeed={2} enableZoom={true} makeDefault />
          <Eye 
            scale={0.01} 
            position={[0, 0, 0]} 
            rotation={[0, -Math.PI/2, Math.PI/2]} 
          />
        </Canvas>
      </div>
      <div className="home-text-container">
        <p className="home-subtitulo">¡LA CIENCIA DETRÁS DE LA VISIÓN!</p>
        <h1 className="home-titulo">OJO</h1>          
        <p className="home-descripcion">El ojo es una maravilla de la naturaleza, un órgano asombroso que nos conecta con todo lo que nos rodea. Nos permite ver colores, formas y movimientos, todo sin que tengamos que pensarlo. Lo mejor de todo es que, a diferencia de otros órganos, el ojo obtiene oxígeno directamente del aire.
          <br /> <strong>¡Haz clic en "Descubre más sobre los ojos" para más información!</strong>
        </p>
        
        {showMoreInfo && (
          <div className="home-info-adicional">
            <h3>Información importante</h3>
            <p>Conoce cómo enfermedades como el agujero macular, cataratas, conjuntivitis y glaucoma afectan tu visión. Descubre sus síntomas, tratamientos y cómo prevenirlas.</p>
            <p>Visita la sección <strong>Enfermedades</strong> en el menú superior, para más información. </p>
          </div>
        )}
        
        <div className="home-botones">
          <button className="home-btn" onClick={handleClick}>
            {showMoreInfo ? "Ocultar información" : "Descubre más sobre los ojos"}
          </button>
        </div>
      </div>
      </div>

      <section className="home-enfermedades-section">
        <div className="home-enfermedades-content">
        <h2 className="home-enfermedades-titulo">¡APRENDE SOBRE SUS ENFERMEDADES!</h2>
        <div className="home-enfermedades-tarjetas-container">
          <h2 className="home-enfermedades-tarjetas-titulo">EXPLORA ENFERMEDADES OCULARES</h2>
          <div className="home-enfermedades-tarjetas-grid">
            {[
              {
                nombre: "Agujero macular",
                ruta: "/agujero-macular/que-es",
                img: "/images/home/home-enfermedad-agujero-macular.png",
                descripcion: "Provoca una zona ciega o mancha en el centro de la visión."
              },
              {
                nombre: "Cataratas",
                ruta: "/cataratas/que-es",
                img: "/images/home/home-enfermedad-cataratas.png",
                descripcion: "Presencia de una pequeña apertura circular en la mácula."
              },
              {
                nombre: "Conjuntivitis",
                ruta: "/conjuntivitis/que-es",
                img: "/images/home/home-enfermedad-conjuntivitis.png",
                descripcion: "Pequeña apertura circular en la mácula."
              },
              {
                nombre: "Glaucoma",
                ruta: "/glaucoma/que-es",
                img: "/images/home/home-enfermedad-glaucoma.png",
                descripcion: "Pérdida de visión y ceguera al dañar el nervio."
              }
            ].map((enfermedad) => (
              <div
                key={enfermedad.nombre}
                className="home-enfermedades-tarjeta"
                onClick={() => navigate(enfermedad.ruta)}
              >
                <img src={enfermedad.img} alt={enfermedad.nombre} className="home-enfermedades-tarjeta-img" />
                <h3>{enfermedad.nombre}</h3>
                <p>{enfermedad.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="home-enfermedades-footer">¡Tu visión importa! Aprende sobre las enfermedades oculares y sus cuidados!</p>
      </div>
      </section>

      <section className="home-quiz-section">
        <h2 className="home-quiz-title">¿ESTÁS PREPARADO?</h2>
        <img className="home-quiz-image" src="/images/home/home-quiz.png" alt="Quiz" />
        <p className="home-quiz-description">
          Es momento de poner a prueba tus conocimientos con un pequeño quiz ;)
        </p>
        <button className="home-quiz-button" onClick={() => navigate('/quiz')}>
          INTENTAR
        </button>
      </section>

       </>
    
  );
};

export default Home