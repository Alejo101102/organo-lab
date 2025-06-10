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
            <p>Descubre cómo afectan a tus ojos enfermedades como el agujero macular, las cataratas, la conjuntivitis y el glaucoma. 
              Aprende sobre sus síntomas, tratamientos efectivos y los cuidados esenciales para prevenirlas. 
              ¡Cuida tu vista y mantén tus ojos saludables con la información que necesitas!</p>
            <p>Para conocer más sobre distintas condiciones que afectan la salud visual, dirígete a la sección <strong>Enfermedades</strong> en el menú superior y haz clic en la que te interese.</p>
          </div>
        )}
        
        <div className="home-botones">
          <button className="home-btn" onClick={handleClick}>
            {showMoreInfo ? "Ocultar información" : "Descubre más sobre los ojos"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home