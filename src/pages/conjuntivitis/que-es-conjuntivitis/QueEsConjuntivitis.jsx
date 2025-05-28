import './QueEsConjuntivitis.css';
import { Canvas } from '@react-three/fiber';
import { ModeloQueEsConjuntivitis } from '../que-es-conjuntivitis/Modelos3DConjuntivitis/QueEsConjuntivitisModel';

import { Link, useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import Lights from './lights/LightsConjuntivitis';
import Controls from './controls/ControlsConjuntivitis';
import { Physics, RigidBody } from '@react-three/rapier';
import Staging from './staging/StagingConjuntivitis';
import Title from './texts/TitleConjuntivitis';
import { KeyboardControls } from '@react-three/drei';

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
                <Lights />  
                <Staging />
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
        </div>

      <div className="texto">
        <p>
          La conjuntivitis es una inflamación o infección de la conjuntiva, la membrana transparente que recubre el párpado y la parte blanca del ojo.
          Esta condición puede ser causada por infecciones virales o bacterianas, alergias o irritantes.
        </p>
        <p>
          Existen varios tipos de conjuntivitis, incluyendo la conjuntivitis viral, bacteriana y alérgica. Los síntomas comunes incluyen enrojecimiento, picazón, secreción y sensación arenosa en los ojos.
        </p>
      </div>
    
    </div>
  );
};


export default QueEsConjuntivitis;
