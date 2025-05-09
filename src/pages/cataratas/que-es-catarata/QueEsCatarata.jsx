import './QueEsCatarata.css';
import { Canvas } from '@react-three/fiber';
import { CataractEye } from "./models-3d/CataractEye";
import { BeginCataractEye } from "./models-3d/BeginCataractEye";
import { Link, useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import Lights from './lights/Lights';
import Controls from './controls/Controls';
import { Physics, RigidBody } from '@react-three/rapier';

const QueEsCatarata = () => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const modelContainerRef = useRef(null);

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
    <div className="catarata-container">
      <h1 className="catarata-titulo">CATARATAS</h1>
    </div>
    <div className="catarata-que-es-container">
      <h3 className="catarata-que-es-titulo">¿QUÉ ES?</h3>
      
        <div 
          className="catarata-modelo-3d-container"
          ref={modelContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleModelHover}
          onMouseLeave={handleModelLeave}
        >
          {showTooltip && (
            <div className="catarata-modelo-tooltip" style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y - 30, // Posicionado 40px arriba del cursor
              position: 'fixed'
            }}>
              Mueve el modelo 3D
            </div>
          )}
          
          <div className="catarata-que-es-modelo-3d" >
            <Canvas camera={{ position: [0, 2, 15]}} shadows={true} >
              <Lights />  
              <Controls />
              <group
                onPointerOver={() => setShowTooltip(true)}
                onPointerOut={() => setShowTooltip(false)}
              >
                <Physics>

                  <RigidBody type="fixed" colliders="trimesh">
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow={true}>
                      <circleGeometry args={[12, 64]} />
                      <meshStandardMaterial color="darkgray" />
                    </mesh>
                  </RigidBody>

                  <CataractEye scale={150} physics={false} position={[-0.7, 4.5, 1]} castshadow={true} /> {/*scale={7} position={[0, 1.2, 0]}*/}
                </Physics>
              </group>
            </Canvas>
          </div>
        </div>

      <div className="catarata-que-es-catarata-texto">
        <p>
          Una catarata es un área nublada en el cristalino, es decir, el "lente" de su ojo
          (la parte clara de su ojo que ayuda a enfocar la luz). Las cataratas son muy comunes a medida que usted envejece. En efecto, más de la mitad de todos los estadounidenses de 80 años o más tiene cataratas o ha tenido cirugía para eliminarlas.
        </p>
        <p>
          Al principio, es posible que usted no note que tiene una catarata. Pero con el paso del tiempo, las cataratas pueden hacer que su visión se haga borrosa, difusa, o menos colorida. Podría tener problemas para leer o realizar otras actividades cotidianas
        </p>
      </div>
    </div>
    

    {/* =============== SINTOMAS ================*/}


    <div className="catarata-sintomas-container">      
      <h2 className="catarata-sintomas-titulo">SÍNTOMAS</h2>
        <div 
          className="catarata-modelo-3d-container"
          ref={modelContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleModelHover}
          onMouseLeave={handleModelLeave}
        >
          {showTooltip && (
            <div className="catarata-modelo-tooltip" style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y - 30, // Posicionado 40px arriba del cursor
              position: 'fixed'
            }}>
              Mueve el modelo 3D
            </div>
          )}
          
          <div className="catarata-sintomas-modelo-3d" >
            <Canvas camera={{ position: [0, 2, 15]}} shadows={true} >
              <Lights />  
              <Controls />
              <group
                onPointerOver={() => setShowTooltip(true)}
                onPointerOut={() => setShowTooltip(false)}
              >
                <Physics>

                  <RigidBody type="fixed" colliders="trimesh">
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow={true}>
                      <circleGeometry args={[12, 64]} />
                      <meshStandardMaterial color="darkgray" />
                    </mesh>
                  </RigidBody>

                  <BeginCataractEye scale={150} physics={false} position={[-0.7, 4.5, 1]} castshadow={true} /> {/*scale={7} position={[0, 1.2, 0]}*/}
                </Physics>
              </group>
            </Canvas>
          </div>
        </div>

      

        <div className="catarata-sintomas-texto">
          <p>
            Usted podría no tener síntomas al principio, cuando las cataratas son leves. Pero a medida que las cataratas crecen, pueden causar cambios en su visión. Por ejemplo, usted podría notar que:
          </p>
          <ul>
            <li>Su visión está nublada o borrosa.</li>
            <li>Los colores se ven opacos (vision opaca).</li>
            <li>No puede ver bien en las noches.</li>
            <li>Las lámparas, la luz del sol o los focos de los autos se ven demasiado brillantes.</li>
            <li>Ve una aureola alrededor de las luces.</li>
            <li>Visión doble.</li>
          </ul>
        </div>
        <div className="catarata-contenedor-tarjetas">
          <div className="catarata-tarjetas-sintomas">
            <div className="catarata-imagen-tarjeta-sintomas">
              <div className="catarata-imagen-con-borde">
                <img src="/images/catarata/sintomas/vision-borrosa.jpg" alt="Visión borrosa" />
              </div>
            </div>
            <h4 className="catarata-tarjeta-sintomas-titulo">Visión borrosa</h4>
            <p className="catarata-tarjeta-sintomas-descripcion">Disminución de la claridad o nitidez de la visión.</p>
          </div>

          <div className="catarata-tarjetas-sintomas">
            <div className="catarata-imagen-tarjeta-sintomas">
              <div className="catarata-imagen-con-borde">
                <img src="/images/catarata/sintomas/vision-opaca.jpg" alt="Visión opaca" />
              </div>
            </div>
            <h4 className="catarata-tarjeta-sintomas-titulo">Visión opaca</h4>
            <p className="catarata-tarjeta-sintomas-descripcion">La visión opaca produce que se oscurezcan los objetos apareciendo un “blanquecino”.</p>
          </div>

          <div className="catarata-tarjetas-sintomas">
            <div className="catarata-imagen-tarjeta-sintomas">
              <div className="catarata-imagen-con-borde">
                <img src="/images/catarata/sintomas/aurelola-luces.jpg" alt="Aureola alrededor de luces" />
              </div>
            </div>
            <h4 className="catarata-tarjeta-sintomas-titulo">Aureola alrededor de luces</h4>
            <p className="catarata-tarjeta-sintomas-descripcion">Ver halos alrededor de las luces.</p>
          </div>

          <div className="catarata-tarjetas-sintomas">
            <div className="catarata-imagen-tarjeta-sintomas">
              <div className="catarata-imagen-con-borde">
                <img src="/images/catarata/sintomas/vision-doble.jpg" alt="Visión doble" />
              </div>
            </div>
            <h4 className="catarata-tarjeta-sintomas-titulo">Visión doble</h4>
            <p className="catarata-tarjeta-sintomas-descripcion">Ver doble (este síntoma a veces desaparece a medida que la catarata crece).</p>
          </div>
        </div>
    </div>

  </>

    
  );
};

export default QueEsCatarata;