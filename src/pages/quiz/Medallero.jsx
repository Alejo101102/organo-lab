// src/pages/quiz/cuestionario/Medallero.jsx

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './Medallero.css'; // Para el estilo de pantalla completa (lo creamos abajo)
import { Podiums } from './models-3d/Podiums'; 
import { Text3D } from '@react-three/drei';


const Medallero = () => {
  return (
    <div className="medallero-container">
      <Canvas camera={{ position: [-5, 2, 10], fov: 20 }}>
        <ambientLight intensity={2} />
          <directionalLight 
            position={[0, 10, 0]} 
            intensity={1} 
            color="white" 
            target-position={[0, 0, 0]} 
          />

          {/* Luz azul sobre el podio izquierdo */}
          <directionalLight 
            position={[-4, 10, 0]} 
            intensity={1} 
            color="red" 
            target-position={[-4, 0, 0]} 
          />

          {/* Luz dorada sobre el podio derecho */}
          <directionalLight 
            position={[4, 10, 0]} 
            intensity={1} 
            color="blue" 
            target-position={[4, 0, 0]} 
          />

        <Podiums physics={false}/>

          {/* Texto sobre cada podio */}
          <Text3D
            position={[-7.8, 0.1, -33.5]} // Izquierdo
            font="/fonts/roboto.json"
            size={0.8}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            SEGUNDO
            <meshStandardMaterial color="red" />
          </Text3D>

          <Text3D
            position={[0.1, 0.1, -30.6]} // Centro
            font="/fonts/roboto.json"
            size={0.8}
            height={0.2}
            bevelEnabled
          >
            PRIMERO
            <meshStandardMaterial color="white" />
          </Text3D>

          <Text3D
            position={[8, 0.1, -33.5]} // Derecho
            font="/fonts/roboto.json"
            size={0.8}
            height={0.2}
            bevelEnabled
          >
            TERCERO
            <meshStandardMaterial color="blue" />
          </Text3D>

        <OrbitControls target={[0, 0, -30]} />
      </Canvas>
    </div>
  );
};

export default Medallero;
