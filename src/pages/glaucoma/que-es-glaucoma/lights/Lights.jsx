// Lights.js
import React from 'react';
import { Environment, OrbitControls, SoftShadows } from '@react-three/drei';  // Importa SoftShadows y Environment

const Lights = () => {
  return (
    <>
      {/* Luz ambiental suave */}
      <ambientLight intensity={0.4} /> 

      {/* Luz direccional para iluminar la escena */}
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1} 
        castShadow={true}
        shadow-mapSize-width={1024}  // Mejor resolución de sombras
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={10}
      />

      {/* Agregar un fondo de iluminación usando Environment */}
      <Environment preset="warehouse" />  {/* Puedes probar "sunset", "dawn", o incluso cargar tus propios HDRIs */}

      {/* Agregar sombras suaves */}
      <SoftShadows />
    </>
  );
};

export default Lights;
