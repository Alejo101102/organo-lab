import React from 'react'
import './QueEsAgujeroMacular.css'
import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import Lights from './lights/Lights';
import Controls from '../../agujero-macular/que-es-agujero-macular/controls/Controls'
import InternEye from '../models-3d/InternEye'
import Forest from '../models-3d/Forest'


const QueEsAgujeroMacular = () => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const modelContainerRef = useRef(null);

  //Función para manejar el movimiento del mouse
  const handleMouseMove = (event) => {
    //Actualiza la posición del tooltip según la posición del mouse
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  //Función para manejar el hover sobre el modelo 3D
  const handleMouseHover = () => {
    setShowTooltip(true);
  };

  //Función para manejar cuando el cursor sale del modelo 3D
  const handleModelLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <div className="agumac-container">
        <h1 className="agumac-titulo">AGUJERO MACULAR</h1>
      </div>
      <div className="agumac-que-es-container">
        <h3 ClassName="agumac-que-es-titulo">¿QUÉ ES</h3>

        <div className="agumac-modelo-3d-container"
          ref={modelContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleModelLeave}
        >
          {showTooltip && (
            <div className="agumac-modelo-tooltip" style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y - 30,
              position: 'fixed'
            }}>
              Mueve el Modelo 3D
            </div>
          )}

          <div className="agumac-que-es-modelo-3d">
            <Canvas camera={{ position: [8.5, 3.5, -10] }}
              shadows={true}>
              <Lights />
              <Controls />
              <group
                rotation={[0, Math.PI * 55 / 180, 0]}
                position={[-0.15, 0, 0]}
                onPointerOver={() => setShowTooltip(true)}
                onPointerOut={() => setShowTooltip(false)}
              >
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow={true}>
                  <circleGeometry args={[12, 64]} />
                  <meshStandardMaterial color="darkgray" />
                </mesh>
                <InternEye scale={40} physics={false} castshadow={true} />
              </group>
            </Canvas>
          </div>
        </div>

        <div className="agumac-que-es-agumac-texto">
          <p>
            Un agujero macular es la presencia de una pequeña apertura circular en la mácula,
            que es la zona central de la retina.
          </p>
          <p>
            Se produce por una rotura por tracción del vítreo, que es una sustancia gelatinosa que está unida a la retina.
            El agujero macular afecta la visión central y puede causar distorsión o pérdida de las imágenes.
          </p>
          <p>
            Es más frecuente en mujeres y puede ser bilateral en algunos casos.
          </p>
        </div>

        {/* =============== SINTOMAS ================ */}





      </div>




    </>
  );
};

export default QueEsAgujeroMacular;