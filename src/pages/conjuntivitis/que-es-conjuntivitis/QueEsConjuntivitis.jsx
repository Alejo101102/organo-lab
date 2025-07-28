import './QueEsConjuntivitis.css';
import { Canvas } from '@react-three/fiber';
import { ModeloQueEsConjuntivitis } from '../que-es-conjuntivitis/Modelos3DConjuntivitis/QueEsConjuntivitisModel';
import { ModeloSintomasConjuntivitis} from '../que-es-conjuntivitis/Modelos3DConjuntivitis/SintomasConjuntivitisModel';
import { ModeloTratamientosConjuntivitis} from '../que-es-conjuntivitis/Modelos3DConjuntivitis/TratamientosConjuntivitisModel';
import { ModeloPrevencionConjuntivitis} from '../que-es-conjuntivitis/Modelos3DConjuntivitis/PrevencionConjuntivitis';

import { Link, useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import LightsQueEs from './lights/LightsConjuntivitisQueEs';
import LightsSintomas from './lights/LightsConjuntivitisSintomas';
import LightsTratamientos from './lights/LightsConjuntivitisTratamientos';
import LightsPrevencion from './lights/LightsConjuntivitisPrevencion';

import Controls from './controls/ControlsConjuntivitis';
import { Physics, RigidBody } from '@react-three/rapier';
import StagingQueEs from './staging/StagingConjuntivitisQueEs';
import StagingSintomas from './staging/StagingConjuntivitisSintomas';
import StagingTratamientos from './staging/StagingConjuntivitisTratamientos';
import StagingPrevencion from './staging/StagingConjuntivitisPrevencion';

import TitleConjuntivitis from './texts/TitleConjuntivitis';
import Text2D from './texts/Text2D';
import Text3D from './texts/Text3D';
import BotonVideo from './texts/ButtonVideo';
import KeyboardWrapper from './AuxiliaryFuntions/KeyboardWrapper';
import { motion } from 'framer-motion';
import PrevencionCarrusel from './AuxiliaryFuntions/PrevencionCarrusel';
import TarjetasSintomasConjuntivitis from './AuxiliaryFuntions/TarjetasSintomasConjuntivitis';


const QueEsConjuntivitis = () =>  {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const modelContainerRef = useRef(null);

  const [showModal, setShowModal] = useState(false);



  // Función para manejar el movimiento del mouse
  const handleMouseMove = (event) => {
    // Actualiza la posición del tooltip según la posición del mouse
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

    // Función para manejar el hover sobre el modelo 3D
    const handleModelHover = () => {
      setShowTooltip(true);
    };
  
    // Función para manejar cuando el cursor sale del modelo 3D
    const handleModelLeave = () => {
      setShowTooltip(false);
    };

  return (
  <>
    <div className="conjuntivitis-que-es-container">
        <h3 className="conjuntivitis-titulo">Conjuntivitis</h3>
        
          <div 
            className="conjuntivitis-modelo-3d-container"
            ref={modelContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleModelHover}
            onMouseLeave={handleModelLeave}
          >
            {showTooltip && (
              <div className="conjuntivitis-modelo-tooltip" style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y - 30, // Posicionado 40px arriba del cursor
                position: 'fixed'
              }}>
                Mueve el modelo 3D
              </div>
            )}
            
            <div className="conjuntivitis-que-es-modelo-3d" >
              <KeyboardWrapper>
                <Canvas camera={{ position: [0, 4, 17]}} shadows={true} style={{ background: '#dcdcdc' }}>
                  <LightsQueEs />  
                  <StagingQueEs />
                  <Controls />
                  <Text3D text3d={"Que es?"}/>
                  <Text2D text={"Conjuntivitis"}/>
                  <group
                    onPointerOver={() => setShowTooltip(true)}
                    onPointerOut={() => setShowTooltip(false)}
                  >
                    <Physics>

                      <RigidBody type="fixed" colliders="trimesh">
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow={true}>
                          <circleGeometry args={[12, 64]} />
                          <meshStandardMaterial color="#888888" />
                        </mesh>
                      </RigidBody>

                      <ModeloQueEsConjuntivitis scale={150} physics={false} position={[-0.7, 2.5, 1]} castshadow={true} /> {/*scale={7} position={[0, 1.2, 0]}*/}
                    </Physics>
                  </group>
                </Canvas>
              </KeyboardWrapper>
            </div>
            <p></p>
          </div>

        <div className="conjuntivitis-que-es-conjuntivitis-texto">
          <p>
            La conjuntivitis es una inflamación o infección de la conjuntiva, la membrana transparente que recubre el párpado y la parte blanca del ojo.
            Esta condición puede ser causada por infecciones virales o bacterianas, alergias o irritantes.
          </p>
          <p>
            Existen varios tipos de conjuntivitis, incluyendo la conjuntivitis viral, bacteriana y alérgica. Los síntomas comunes incluyen enrojecimiento, picazón, secreción y sensación arenosa en los ojos.
          </p>
        </div>
      </div>



        {/*Apartir de esta seccion son los SINTOMAS*/}

        <div className="conjuntivitis-sintomas-wrapper">
          <div className="conjuntivitis-sintomas-container">
            <motion.div 
              className="sintomas"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: false, amount: 0.1 }}
            >
            <div className="sintomas-texto">
              <h4>Síntomas</h4>
              <p>
                La conjuntivitis puede presentarse con una variedad de molestias oculares.
                A continuación, se muestran los síntomas más comunes de forma visual para ayudarte a identificarlos fácilmente.
              </p>
            </div>

            

            
           {/*Modelo 3d de los sintomas */}
           
            <div className="conjuntivitis-sintomas-modelo-3d" >
              <KeyboardWrapper>
                <Canvas camera={{ position: [0, 4, 17]}} shadows={true} style={{ background: '#dcdcdc' }}>
                  <LightsSintomas />  
                  <StagingSintomas />
                  <Controls />
                  <Text3D text3d={"Sintomas"}/>
                  <Text2D text={"Cuales son?"}/>
                  <BotonVideo/>
                  <group
                    onPointerOver={() => setShowTooltip(true)}
                    onPointerOut={() => setShowTooltip(false)}
                  >
                    <Physics>

                      <RigidBody type="fixed" colliders="trimesh">
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow={true}>
                          <circleGeometry args={[12, 64]} />
                          <meshStandardMaterial color="#888888" />
                        </mesh>
                      </RigidBody>

                      <ModeloSintomasConjuntivitis scale={600} physics={false} position={[0, -2, 0]} castshadow={true} /> 
                    </Physics>
                  </group>
                </Canvas>
              </KeyboardWrapper>
            </div>
            <p></p>

            <TarjetasSintomasConjuntivitis />

            <p></p>

            </motion.div>

          <svg
            className="curva-separadora"
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,100 C360,300 1080,-100 1440,100 L1440,200 L0,200 Z"
            />
          </svg>

          </div>
        </div>


          








            {/*Seccion de PREVENCION Y CUIDADOS */}

            <div className="conjuntivitis-prevencion-wrapper">
              <div className="conjuntivitis-prevencion-container">
                <motion.div 
                  className="prevencion"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  {/* ✅ Texto primero */}
                  <div className="prevencion-texto">
                    <h4>Prevención y Cuidados</h4>
                    <p>
                      Prevenir la conjuntivitis comienza con buenos hábitos de higiene y cuidados personales. A continuación, te presentamos algunas recomendaciones clave para reducir el riesgo de contagio o recaída.
                    </p>
                  </div>

                  <PrevencionCarrusel />

                  {/* ✅ Modelo 3D debajo */}
                  <div className="conjuntivitis-prevencion-modelo-3d">
                    <KeyboardWrapper>
                      <Canvas camera={{ position: [0, 4, 17]}} shadows={true} style={{ background: '#dcdcdc' }}>
                        <LightsPrevencion />
                        <StagingPrevencion /> 
                        <Controls />
                        <TitleConjuntivitis title={"Prevención"} />
                        <group
                          onPointerOver={() => setShowTooltip(true)}
                          onPointerOut={() => setShowTooltip(false)}
                        >
                          <Physics>
                            <RigidBody type="fixed" colliders="trimesh">
                            </RigidBody>
                            <ModeloPrevencionConjuntivitis scale={600} physics={false} position={[0, -2, 0]} castshadow={true} />
                          </Physics>
                        </group>
                      </Canvas>
                    </KeyboardWrapper>
                  </div>

                </motion.div>
              </div>
            </div>


          





            {/* Sección DE TRATAMIENTOS */}
          
            <div className="conjuntivitis-tratamientos-wrapper">
              <div className="conjuntivitis-tratamientos-box">
                
                <motion.div 
                  className="tratamientos"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                <div className="tratamientos-texto">
                  <h4>Tratamientos para la Conjuntivitis</h4>
                  <ul>
                    <li>💧 Limpieza frecuente de los ojos con solución salina</li>
                    <li>🧴 Uso de colirios antibióticos (si es bacteriana)</li>
                    <li>🧼 Evitar tocarse los ojos con las manos sucias</li>
                    <li>👓 Usar gafas oscuras para aliviar la sensibilidad a la luz</li>
                    <li>📆 Visita al oftalmólogo si los síntomas persisten más de 3 días</li>
                  </ul>
                </div>
                
                {/* Modelo 3D opcional de tratamientos */}
                  <div className="conjuntivitis-tratamientos-modelo-3d" >
                    <KeyboardWrapper>
                      <Canvas camera={{ position: [0, 4, 17]}} shadows={true} style={{ background: '#dcdcdc' }}>
                        <LightsTratamientos />
                        <StagingTratamientos />
                        <Controls />
                        <TitleConjuntivitis title={"Tratamientos"} />
                        <group
                          onPointerOver={() => setShowTooltip(true)}
                          onPointerOut={() => setShowTooltip(false)}
                        >
                          <Physics>
                            <RigidBody type="fixed" colliders="trimesh">
                              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow={true}>
                                <circleGeometry args={[12, 64]} />
                                <meshStandardMaterial color="#888888" />
                              </mesh>
                            </RigidBody>
                            <ModeloTratamientosConjuntivitis scale={600} physics={false} position={[0, -2, 0]} castshadow={true} />
                          </Physics>
                        </group>
                      </Canvas>
                    </KeyboardWrapper>
                  </div>

                
                  
                </motion.div>
              </div>
            </div>









{/*Instrucciones */}

<div
      className="burbuja-instrucciones"
      onClick={() => setShowModal(true)}
    >
      <div className="tooltip-instrucciones">Explora el modelo</div>
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
          <p>👈 Da doble clic al modelo para que comience rotar o se detenga.</p>
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


export default QueEsConjuntivitis;
