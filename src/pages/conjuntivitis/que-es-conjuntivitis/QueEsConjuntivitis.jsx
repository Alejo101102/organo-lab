import './QueEsConjuntivitis.css';
import { Canvas } from '@react-three/fiber';
import { ModeloQueEsConjuntivitis } from '../que-es-conjuntivitis/Modelos3DConjuntivitis/QueEsConjuntivitisModel';
import { ModeloSintomasConjuntivitis} from '../que-es-conjuntivitis/Modelos3DConjuntivitis/SintomasConjuntivitisModel';
import { ModeloTratamientosConjuntivitis} from '../que-es-conjuntivitis/Modelos3DConjuntivitis/TratamientosConjuntivitisModel';

import { Link, useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import LightsQueEs from './lights/LightsConjuntivitisQueEs';
import LightsSintomas from './lights/LightsConjuntivitisSintomas';
import LightsTratamientos from './lights/LightsConjuntivitisTratamientos';

import Controls from './controls/ControlsConjuntivitis';
import { Physics, RigidBody } from '@react-three/rapier';
import StagingQueEs from './staging/StagingConjuntivitisQueEs';
import StagingSintomas from './staging/StagingConjuntivitisSintomas';
import StagingTratamientos from './staging/StagingConjuntivitisTratamientos';

import Title from './texts/TitleConjuntivitis';
import { KeyboardControls } from '@react-three/drei';
import { motion } from 'framer-motion';

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
                <Canvas camera={{ position: [0, 4, 17]}} shadows={true} style={{ background: '#dcdcdc' }}>
                  <LightsQueEs />  
                  <StagingQueEs />
                  <Controls />
                  <Title title={"Conjuntivitis"} />
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
              </KeyboardControls>
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
      
    {/*Apartir de esta seccion son los SINTOMAS*/}

        <div className="conjuntivitis-sintomas-wrapper">
          <div className="conjuntivitis-sintomas-container">
            <motion.div 
              className="sintomas"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <h4>Síntomas de la Conjuntivitis</h4>
              <ul>
                <li>👁️ Enrojecimiento de uno o ambos ojos</li>
                <li>😣 Picazón o ardor ocular</li>
                <li>🟡 Secreción espesa que puede formar costras, especialmente al despertar</li>
                <li>💧 Lagrimeo excesivo</li>
                <li>🪟 Sensación de tener arena en el ojo</li>
                <li>📉 Visión ligeramente borrosa por secreciones</li>
                <li>⚡ Sensibilidad a la luz</li>
              </ul>

           {/*Modelo 3d de los sintomas */}
           
            <div className="conjuntivitis-que-es-modelo-3d" >
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
                <Canvas camera={{ position: [0, 4, 17]}} shadows={true} style={{ background: '#dcdcdc' }}>
                  <LightsSintomas />  
                  <StagingSintomas />
                  <Controls />
                  <Title title={"Sintomas"} />
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
              </KeyboardControls>
            </div>
            <p></p>

            </motion.div>

          







            {/* Sección DE TRATAMIENTOS */}
          
            <div className="conjuntivitis-tratamientos-wrapper">
              <div className="conjuntivitis-tratamientos-container">
                <motion.div 
                  className="tratamientos"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <h4>Tratamientos para la Conjuntivitis</h4>
                  <ul>
                    <li>💧 Limpieza frecuente de los ojos con solución salina</li>
                    <li>🧴 Uso de colirios antibióticos (si es bacteriana)</li>
                    <li>🧼 Evitar tocarse los ojos con las manos sucias</li>
                    <li>👓 Usar gafas oscuras para aliviar la sensibilidad a la luz</li>
                    <li>📆 Visita al oftalmólogo si los síntomas persisten más de 3 días</li>
                  </ul>

                  {/* Modelo 3D opcional de tratamientos */}
                  <div className="conjuntivitis-que-es-modelo-3d" >
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
                      <Canvas camera={{ position: [0, 4, 17]}} shadows={true} style={{ background: '#dcdcdc' }}>
                        <LightsTratamientos />
                        <StagingTratamientos />
                        <Controls />
                        <Title title={"Tratamientos"} />
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
                    </KeyboardControls>
                  </div>
                </motion.div>
              </div>
            </div>

            
          </div>
        </div>







      </div>
  </>
    
  );
};


export default QueEsConjuntivitis;
