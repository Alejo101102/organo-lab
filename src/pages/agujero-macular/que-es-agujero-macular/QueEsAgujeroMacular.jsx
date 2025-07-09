import React from 'react'
import './QueEsAgujeroMacular.css'
import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import Controls from '../../agujero-macular/que-es-agujero-macular/controls/Controls'
import { KeyboardControls } from '@react-three/drei';

import TitleAgujeroMacular from './texts/TitleAgujeroMacular'
import Lights from './lights/Lights';
import LightsSintomas from './lights/LightsSintomas'
import Staging from './staging/Staging'
import PostProcessing from './PostProcessing'

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
        <br />
        <br />
        <br />
      </div>
      <div className="agumac-que-es-container">
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
            <KeyboardControls
              map={[
                { name: "forward", keys: ["w", "ArrowUp"] },
                { name: "backward", keys: ["s", "ArrowDown"] },
                { name: "left", keys: ["a", "ArrowLeft"] },
                { name: "right", keys: ["d", "ArrowRight"] },
                { name: "up", keys: ["e", "PageUp"] },
                { name: "down", keys: ["q", "PageDown"] }
              ]}
            >
              <Canvas camera={{ position: [8.5, 3.5, -10] }}
                shadows={true}>
                <Lights />
                <Controls />
                <TitleAgujeroMacular title={"¿Qué es?"} />
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
            </KeyboardControls>
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
      </div>

      {/* =============== SINTOMAS ================ */}

      <div className="agumac-sintomas-container">
        <h2 className="agumac-sintomas-titulo">SÍNTOMAS</h2>

        <div
          className="agumac-modelo-3d-container"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleModelLeave}
        >
          {showTooltip && (
            <div className="agumac-modelo-tooltip" style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y - 30, // Posicionado 40px arriba del cursor
              position: 'fixed'
            }}>
              Mueve el modelo 3D
            </div>
          )}

          <div className="agumac-que-es-modelo-3d" >
            <KeyboardControls
              map={[
                { name: "forward", keys: ["w", "ArrowUp"] },
                { name: "backward", keys: ["s", "ArrowDown"] },
                { name: "left", keys: ["a", "ArrowLeft"] },
                { name: "right", keys: ["d", "ArrowRight"] },
                { name: "up", keys: ["e", "PageUp"] },
                { name: "down", keys: ["q", "PageDown"] }
              ]}
            >
              <Canvas camera={{ position: [0, 2, 15] }} shadows={true} >
                <LightsSintomas />
                <Controls />
                <Staging />
                <group
                  onPointerOver={() => setShowTooltip(true)}
                  onPointerOut={() => setShowTooltip(false)}
                >
                  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1, -7, -7]} receiveShadow={true}>
                    <circleGeometry args={[12, 64]} />
                    <meshStandardMaterial color="green" />
                  </mesh>
                  <Forest scale={100} physics={false} position={[1, -1, -7]} castshadow={true} />
                </group>
                <PostProcessing />
              </Canvas>
            </KeyboardControls>
          </div>
        </div>

        <div className="agumac-sintomas-texto">
          <p>
            El agujero macular puede ser muy sutil al principio y no notarse, aunque, si crece,
            puede acabar afectando de forma muy severa la visión central, provocando incluso una
            zona ciega o mancha en el centro de la visión.
          </p>
          <p>
            Aunque en algunos pacientes el agujero macular puede estar presente en ambos ojos, suele
            afectar a uno solo. Por ello, taparte primero un ojo y luego el otro para comparar tu
            visión en cada caso (si ves más borroso, si las líneas rectas te parecen torcidas u
            onduladas...), puede ayudarte a detectar esta enfermedad, además de acudir a revisiones periódicas con el oftalmólogo.
          </p>

          <div className="agumac-contenedor-tarjetas">
            <div className="agumac-tarjetas-sintomas">
              <div className="agumac-imagen-tarjeta-sintomas">
                <div className="agumac-imagen-con-borde">
                  <img src="/images/agujero-macular/sintomas/perdida-vision.jpg" alt="Perdida de visión central" />
                </div>
              </div>
              <h4 className="agumac-tarjeta-sintomas-titulo">Perdida de visión central</h4>
              <p className="agumac-tarjeta-sintomas-descripcion">Deriva de enfermedades que afectan a la mácula y puede aparecer de forma repentina.</p>
            </div>

            <div className="agumac-tarjetas-sintomas">
              <div className="agumac-imagen-tarjeta-sintomas">
                <div className="agumac-imagen-con-borde">
                  <img src="/images/agujero-macular/sintomas/vision-distorsionada.jpg" alt="Visión distorsionada" />
                </div>
              </div>
              <h4 className="agumac-tarjeta-sintomas-titulo">Visión distorsionada</h4>
              <p className="agumac-tarjeta-sintomas-descripcion">Percepción de imágenes de nuestro entorno con una forma y un tamaño alterados.</p>
            </div>

            <div className="agumac-tarjetas-sintomas">
              <div className="agumac-imagen-tarjeta-sintomas">
                <div className="agumac-imagen-con-borde">
                  <img src="/images/agujero-macular/sintomas/destello.jpg" alt="Destellos en los ojos" />
                </div>
              </div>
              <h4 className="agumac-tarjeta-sintomas-titulo">Destellos en los ojos</h4>
              <p className="agumac-tarjeta-sintomas-descripcion">Flash de luz que se experimenta sin haber recibido un estímulo luminoso externo.</p>
            </div>

            <div className="agumac-tarjetas-sintomas">
              <div className="agumac-imagen-tarjeta-sintomas">
                <div className="agumac-imagen-con-borde">
                  <img src="/images/agujero-macular/sintomas/mancha-negra.jpg" alt="Mancha negra" />
                </div>
              </div>
              <h4 className="agumac-tarjeta-sintomas-titulo">Cortina o Mancha negra</h4>
              <p className="agumac-tarjeta-sintomas-descripcion">Pequeños puntos, zona ciega en el centro de la visión o una cortina.</p>
            </div>

          </div>

        </div>
      </div>


    </>
  );
};

export default QueEsAgujeroMacular;