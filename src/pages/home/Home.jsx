import React from 'react'
import { useNavigate } from 'react-router'
import { useCallback } from 'react'
import './Home.css'
import MattSmith from './models-3d/MattSmith'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Eye from './models-3d/eye'


/*
const Home = () => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate("/corazon", {
      state: { userData: { displayName: "OrganoLab" } },
    });
  }, [navigate]);
  */

  /*
  return (
    <div className='home'>
      <h1>Inicio</h1>
      <button onClick={handleClick}>Descubre más sobre los ojos</button>
      <MattSmith />
    </div>
  )
  */

  const Home = () => {
    const handleClick = () => {
      window.location.href = "/explorar";
    };
  
    return (
      <div className="home-container">
        <div className="model-container">
          <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, -4]} intensity={1} />
            <OrbitControls enableZoom={true} />
            <Eye position={[0, 3, 0]} />
          </Canvas>
        </div>
        <div className="text-container">
          <p className="subtitulo">¡La ciencia detrás de la visión!</p>
          <h1 className="titulo">OJO</h1>
          <p className="descripcion">Explora el ojo humano en 3D</p>
          <div className="botones">
            <button className="btn" onClick={handleClick}>
              Descubre más sobre los ojos
            </button>
            <button className="btn secundario"> 
              OrganoLab
            </button>
          </div>
        </div>
      </div>
    );
  };

export default Home