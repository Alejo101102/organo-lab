import React from 'react'
import './QueEsAgujeroMacular.css'
import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import Controls from '../../agujero-macular/que-es-agujero-macular/controls/Controls'
import { KeyboardControls } from '@react-three/drei';

import TitleAgujeroMacular from './texts/TitleAgujeroMacular'
import Text3DAgujeroMacular from './texts/Text3DAgujeroMacular'
import Text2DAgujeroMacular from './texts/Text2DAgujeroMacular'
import AudioAgujeroMacular from './audio/AudioAgujeroMacular'

import Lights from './lights/Lights';
import LightsSintomas from './lights/LightsSintomas'
import LightsPrevencion from './lights/LightsPrevencion'
import LightsTratamiento from './lights/LightsTratamiento'

import Staging from './staging/Staging'
import StagingPrevencion from './staging/StagingPrevencion'
import PostProcessing from './PostProcessing'

import InternEye from '../models-3d/InternEye'
import Forest from '../models-3d/Forest'
import SnellenTable from '../models-3d/SnellenTable'
import SlitLamp from '../models-3d/SlitLamp'



const tarjetas = [
  {
    img: "/images/agujero-macular/prevencion/foroptero.png",
    titulo: "Examen ocular",
    texto: "Personas con una graduación alta de miopía deben estar pendientes de revisiones oftalmológicas mínima una vez al año"
  },
  {
    img: "/images/agujero-macular/prevencion/medico.png",
    titulo: "Examen ocular",
    texto: "Ignorar la salud visual puede llevar a una disminución progresiva de la agudeza visual y un mayor riesgo de enfermedades oculares."
  },
  {
    img: "/images/agujero-macular/prevencion/medica.png",
    titulo: "Examen ocular",
    texto: "Las personas mayores de 60 años tienen que estar muy pendientes de las revisiones oftalmológicas periódicas mínimo una vez al año."
  }
];

const QueEsAgujeroMacular = () => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false); 
  const [indiceActivo, setIndiceActivo] = useState(1); 
  const modelContainerRef = useRef(null);

  //Manejar tarjetas de prevención
  const siguiente = () => {
    setIndiceActivo((prev) => (prev + 1) % tarjetas.length);
  };

  const anterior = () => {
    setIndiceActivo((prev) => (prev - 1 + tarjetas.length) % tarjetas.length);
  };

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
                <TitleAgujeroMacular title={"¿Qué es?"} position={[12, 4, 10]}/>
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
                <TitleAgujeroMacular title={"Cortina negra"} position={[17, 5, -10]} />
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
              <h4 className="agumac-tarjeta-sintomas-titulo">Mancha negra</h4>
              <p className="agumac-tarjeta-sintomas-descripcion">Pequeños puntos, zona ciega en el centro de la visión o una cortina.</p>
            </div>

          </div>

        </div>
      </div>

      <div className='agumac-separador-sintomas-prevencion'> </div>
          
      {/* =============== PREVENCIÓN ================ */}

      <div className='agumac-prevencion-container'>
        <h2 className="agumac-prevencion-titulo">PREVENCIÓN</h2>
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
              <Canvas camera={{ position: [0, 3.5, 18] }} shadows={true} >
                <LightsPrevencion/>
                <StagingPrevencion />
                <Controls />
                <Text3DAgujeroMacular title={"Tabla de Snellen"} position={[-6.5, -1.6, 7.5]} />
                <Text2DAgujeroMacular title={`Un examen ocular completo\npuede ayudar a detectar la formación\nde un agujero macular,\ncuando es más fácil de tratar.`} 
                  position={[20, 5, -2]}/>
                <group
                  onPointerOver={() => setShowTooltip(true)}
                  onPointerOut={() => setShowTooltip(false)}
                >
                  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1, -7, -7]} receiveShadow={true}>
                    <circleGeometry args={[12, 64]} />
                    <meshStandardMaterial color="gray" />
                  </mesh>
                  <SnellenTable scale={18} physics={false} position={[1, 6, -7]} castshadow={true} />
                </group>
              </Canvas>
            </KeyboardControls>
          </div>
        </div>

        <div className="agumac-prevencion-carrusel-container">
          <button className="prev-btn" onClick={anterior}>&#10094;</button>

          <div className="agumac-carrusel-enfocado">
            {tarjetas.map((tarjeta, i) => {
              const izquierda = (indiceActivo - 1 + tarjetas.length) % tarjetas.length;
              const derecha = (indiceActivo + 1) % tarjetas.length;

              let clase = "agumac-tarjeta-prevencion";
              if (i === indiceActivo) {
                clase = "agumac-tarjeta-prevencion enfocado";
              } else if (i === izquierda || i === derecha) {
                clase = "agumac-tarjeta-prevencion lateral";
              } else {
                clase = "agumac-tarjeta-prevencion";
                // Para tarjetas no visibles, aplicamos estilos de oculto
              }

              // Solo mostramos las 3 tarjetas: izquierda, centro, derecha
              const esVisible = i === indiceActivo || i === izquierda || i === derecha;

              return esVisible ? (
                <div className={clase} key={i}>
                  <img src={tarjeta.img} alt={tarjeta.titulo} />
                  <h3>{tarjeta.titulo}</h3>
                  <div className="separador"></div>
                  <p>{tarjeta.texto}</p>
                </div>
              ) : null;
            })}
          </div>

          <button className="next-btn" onClick={siguiente}>&#10095;</button>
        </div>

        <p className="agumac-prevencion-alerta">Esta enfermedad no puede prevenirse</p>

        <div className="agumac-prevencion-barras-container">
          <div className="agumac-prevencion-barra">
            <img src="/images/agujero-macular/prevencion/foroptero.png" alt="icon" className="agumac-prevencion-barra-icono" />
            <span>Personas con catarata</span>
            <div className="agumac-prevencion-barra-progreso">
              <div className="agumac-progreso" style={{ width: '1.2%', background: '#FFB400' }}></div>
              <span>1.2%</span>
            </div>
          </div>

          <div className="agumac-prevencion-barra">
            <img src="/images/agujero-macular/prevencion/foroptero.png" alt="icon" className="agumac-prevencion-barra-icono" />
            <span>Personas con tratamiento</span>
            <div className="agumac-prevencion-barra-progreso">
              <div className="agumac-progreso" style={{ width: '35%', background: '#199ED9' }}></div>
              <span>35%</span>
            </div>
          </div>
        </div>


      </div>

    {/* =============== TRATAMIENTO ================*/}

      <div className='agumac-tratamiento-container'>
        <h2 className="agumac-tratamiento-titulo">TRATAMIENTO</h2>
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
              <Canvas camera={{ position: [0, 3.5, 18] }} shadows={true} >
                <LightsTratamiento />
                <Controls />
                <StagingPrevencion />
                <TitleAgujeroMacular title={"¿Cómo se trata?"} position={[-12, 6, 5]}/>
                <Text3DAgujeroMacular title={"Lámpara de hendidura"} position={[-10, -1.6, 9]} />
                <Text2DAgujeroMacular title={"Diagnosticar a tiempo las enfermedades es clave \n para poder tratarla precozmente y\n mejorar las posibilidades de recuperación visual "} 
                  position={[16, 5.5, 0.5]}  />
                <AudioAgujeroMacular />
                <group
                  onPointerOver={() => setShowTooltip(true)}
                  onPointerOut={() => setShowTooltip(false)}
                >
                  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, -8, -4]} receiveShadow={true}>
                    <circleGeometry args={[12, 64]} />
                    <meshStandardMaterial color="darkgray" />
                  </mesh>
                    
               <SlitLamp scale={15} physics={false} position={[1, -7, 1]} castshadow={true} /> 
                </group>
              </Canvas>
            </KeyboardControls>
          </div>
        </div>


        <div className="catarata-tratamiento-box">
          <div className="catarata-tratamiento-texto">
            <p>
              Se requiere la cirugía para tratar el agujero macular, más que todo para el manejo
              de casos complejos (como, por ejemplo, en pacientes altos miopes). Además, aunque el 
              tratamiento de esta patología es por lo general quirúrgico (normalmente, mediante
              vitrectomía), también se apuesta por la innovación y la aplicación segura de nuevas
              alternativas terapéuticas como la ocriplasmina. Este fármaco se inyecta en el ojo 
              para tratar casos de tracción vitreomacular que podrían desembocar en un agujero, 
              así como agujeros de pequeño tamaño.
            </p>
          </div>
        </div>
      </div>


    {/* =============== INSTRUCCIONES ================*/}
      <div
        className="burbuja-instrucciones"
        onClick={() => setShowModal(true)}
      >
        <div className="tooltip-instrucciones">Instrucciones</div>
        <img
          src="/images/icons/bot.png"
          alt="Instrucciones"
          className="icono-instrucciones"
        />
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-contenido" onClick={e => e.stopPropagation()}>
            <h2>Instrucciones</h2>
            <p>🖱️ Usa el mouse para mover el modelo 3D (arrastra de un lado al otro).</p>
            <p>🔍 Acércate o aléjate con la rueda del mouse.</p>
            <p>👈 Da clic al modelo para que comience rotar o se detenga.</p>
            <p>⌨️ Para mover la cámara del modelo 3D pon el cursor sobre el modelo o en una esquina del recuadro
              (que te aparezca el texto "Mueve el modelo 3D" arriba del cursor)
              y utiliza las siguientes teclas:
              <ul>
                <li>◉ W: Adelante</li>
                <li>◉ S: Atrás</li>
                <li>◉ A: Izquierda</li>
                <li>◉ D: Derecha</li>
                <li>◉ E: Arriba</li>
                <li>◉ Q: Abajo</li>
              </ul>
            </p>
            <button className="cerrar-modal" onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

    </>
  );
};

export default QueEsAgujeroMacular;