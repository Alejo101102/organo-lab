import React from 'react'
import { useNavigate } from 'react-router'
import { useCallback } from 'react'
import './Home.css'
import MattSmith from './models-3d/MattSmith'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Eye from './models-3d/Eye'


const Home = () => {
  const handleClick = () => {
      
  };
  
  return (
    <div className="home-container">
      <div className="model-container">
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
        <div className="text-container">
          <p className="subtitulo">¡LA CIENCIA DETRÁS DE LA VISIÓN!</p>
          <h1 className="titulo">OJO</h1>          
          <p className="descripcion">En esta página podrás entender cómo funcionan enfermedades como el agujero macular, 
            las cataratas, la conjuntivitis y el glaucoma. Además, conocerás sus síntomas, tratamientos y los cuidados 
            necesarios para prevenirlas.
          </p>
          <div className="botones">
            <button className="btn" onClick={handleClick}>
              Descubre más sobre los ojos
            </button>
          </div>
        </div>
      </div>
    );
  };

export default Home