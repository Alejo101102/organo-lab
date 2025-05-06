import React from "react";
import "./SintomasGlaucoma.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SightSymptomsGlaucoma from "../models-3d/SightSymptomsGlaucoma";

const SintomasGlaucoma = () => {
  return (
    <section className="sintomas-container">
      <div className="alerta">¡ATENCIÓN!</div>
      <h1 className="titulo">SÍNTOMAS</h1>

      <p className="descripcion">
        Al principio, el glaucoma no suele presentar ningún síntoma. Es por eso que la mitad de las personas con glaucoma ni siquiera sabe que lo tiene. Con el
        tiempo, es posible que pierda lentamente la visión, empezando por lo general por su visión lateral (periférica), especialmente el área de su visión que
        está más cerca de la nariz. Debido a que sucede tan lentamente, muchas personas no pueden darse cuenta al principio de que su visión está cambiando.
      </p>

      <div className="tarjeta">
        <div className="modelo-tarjeta">
          <Canvas camera={{ position: [30, 32, 15], fov: 10 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[2, 2, 2]}
            intensity={1} 
            castShadow={true}
            shadow-mapSize-width={1024}  // Mejor resolución de sombras
            shadow-mapSize-height={1024}
            shadow-camera-near={0.1}
            shadow-camera-far={10} 
            />
            <OrbitControls enableZoom={true} />
            <SightSymptomsGlaucoma />
          </Canvas>
        </div>
        <h2 className="tarjeta-titulo">Visión de túnel</h2>
        <p className="tarjeta-descripcion">
          La pérdida lenta de la visión lateral (también llamada visión de túnel) es el tipo principal de pérdida de la visión en el glaucoma.
        </p>
      </div>
    </section>
  );
};

export default SintomasGlaucoma;
