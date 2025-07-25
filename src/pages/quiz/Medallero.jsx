// src/pages/quiz/cuestionario/Medallero.jsx

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './Medallero.css'; // Para el estilo de pantalla completa (lo creamos abajo)
import { Podiums } from './models-3d/Podiums'; 

const Medallero = () => {
  return (
    <div className="medallero-container">
      <Canvas camera={{ position: [-5, 2, 10], fov: 20 }}>
        <ambientLight intensity={1} />
        <directionalLight
                    position={[1, 1.5, 1]}
                    intensity={1.5}
                    castShadow={true}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-near={1}
                    shadow-camera-far={10}
                  />

        <Podiums physics={false}/>
        <OrbitControls target={[0, 0, -30]} />
      </Canvas>
    </div>
  );
};

export default Medallero;
