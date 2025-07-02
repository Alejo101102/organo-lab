
import './QueEsGlaucoma.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';
import Footer from '../../../layout/footer/Footer';
import EyeWithGlaucoma from '../models-3d/EyeWithGlaucoma';
import { useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import SightSymptomsGlaucoma from '../models-3d/SightSymptomsGlaucoma';
import PostProcessing from './PostProcessing';
import Lights from './lights/Lights';
import Controls from './controls/Controls';
import { Physics, RigidBody } from '@react-three/rapier';
import { Environment, Stars, Sky } from '@react-three/drei';
import { Text } from '@react-three/drei';
import SnellenTable from '../models-3d/SnellenTable';
import MattSmith from '../models-3d/matt-smith';
import Title from './texts/Title';


const QueEsGlaucoma = () => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const modelContainerRef = useRef(null);
  const groupRef = useRef();
  const [showVideo, setShowVideo] = useState(false);

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
      <div className="glaucoma-que-es-container">
        <h1 className="glaucoma-titulo">GLAUCOMA</h1>

          <div
            className="glaucoma-modelo-3d-container"
            ref={modelContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleModelHover}
            onMouseLeave={handleModelLeave}
          >
            {showTooltip && (
              <div
                className="glaucoma-modelo-tooltip-que-es"
                style={{
                  left: tooltipPosition.x,
                  top: tooltipPosition.y - 30,
                  position: 'fixed'
                }}
              >
                Mueve el modelo 3D
              </div>
            )}

            <div className="glaucoma-modelo-3d-que-es">
              <Canvas camera={{ position: [5, 0, 20],fov: 20}} shadows={true}>
                      <Lights /> 
                      <OrbitControls target={[0, 3, 1]} />
                      <Controls />

                      <Environment preset="sunset" background /> 
  
                      <group
                        onPointerOver={() => setShowTooltip(true)}
                        onPointerOut={() => setShowTooltip(false)}
                      >
                        <Physics>

                        <directionalLight
                        position={[2, 2, 2]}
                        intensity={1}
                        castShadow={true}
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        shadow-camera-near={0.1}
                        shadow-camera-far={10}
                        /> 
                      
              
                          <RigidBody type="fixed" colliders="trimesh">
                            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow={true}>
                              <circleGeometry args={[12, 64]} />
                              <meshStandardMaterial color="darkgray" />
                            </mesh>
                          </RigidBody>
              
                          <EyeWithGlaucoma scale={0.01} physics={false} position={[-0.7, 3, 1]} rotation={[-Math.PI*90/180, Math.PI*20/180 , 0]} castshadow={true} /> {/*scale={7} position={[0, 1.2, 0]}*/}
                        </Physics>
                      </group>
                    </Canvas>
            </div>
          </div>
        

        
          <p className="glaucoma-descripcion-que-es">
            El glaucoma es un grupo de enfermedades de los ojos que pueden causar pérdida de visión y ceguera al dañar el nervio ubicado en la
            parte posterior del ojo, conocido como nervio óptico. Con frecuencia, el daño al nervio óptico es causado por el aumento de la presión en el ojo. Esta se llama presión intraocular.
            Existen muchos tipos diferentes de glaucoma, pero el tipo más común en los Estados Unidos se conoce como glaucoma de ángulo abierto. Este tipo es al que la mayoría de las personas se refiere cuando habla de glaucoma. Hay otros tipos de glaucomas menos comunes, como el glaucoma de ángulo cerrado y el glaucoma congénito.
          </p>
        

      </div>

      {/* =============== SINTOMAS ================*/}

      <section className="glaucoma-sintomas-container">
        <div className="glaucoma-sintomas-alerta-titulo">¡ATENCIÓN!</div>
        <h1 className="glaucoma-sintomas-titulo">SÍNTOMAS</h1>

        <div className="glaucoma-sintomas-wrapper">
          <p className="glaucoma-descripcion-sintomas">
            Al principio, el <strong>glaucoma</strong> no suele presentar ningún síntoma. Es por eso que la mitad de las personas con glaucoma ni siquiera sabe que lo tiene. Con el tiempo, es posible que pierda lentamente la visión, empezando
            por lo general por su visión lateral (periférica), especialmente el área de su visión que está más cerca de la nariz. Debido a que sucede tan lentamente, muchas
            personas no pueden darse cuenta al principio de que su visión está cambiando.
          </p>

          <div className="glaucoma-sintomas-tarjeta">
            <div className="glaucoma-sintomas-modelo-tarjeta">
              <Canvas camera={{ position: [1, 1.5, 4], fov: 50 }}>
                <group
                  onPointerOver={() => setShowTooltip(true)}
                  onPointerOut={() => setShowTooltip(false)}
                >
                  <ambientLight intensity={1} />
                  <directionalLight
                    position={[6, 1.5, 1]}
                    intensity={1}
                    castShadow={true}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-near={1}
                    shadow-camera-far={10}
                  />
                  <OrbitControls target={[0.5, 1, 0]} enableZoom={true} />
                  <SightSymptomsGlaucoma />
                  <Text
                    position={[2, 2.0, 0]}
                    fontSize={0.15}
                    color="lightgray"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={4}
                  >
                    Pérdida de visión periférica
                  </Text>
                  <PostProcessing />
                </group>
              </Canvas>
            </div>

            <h2 className="glaucoma-tarjeta-sintomas-titulo">Visión de túnel</h2>
            <p className="glaucoma-tarjeta-sintomas-descripcion">
              La pérdida lenta de la visión lateral (también llamada visión de túnel) es el tipo principal de pérdida de la visión en el glaucoma.
            </p>
          </div>
        </div>
      </section>


       {/* =============== PREVENCION ================*/}


  <section className="glaucoma-prevencion-container">
  <h2 className="glaucoma-prevencion-titulo">
  PREVIENE ENFERMEDADES<br />OCULARES
</h2>


  <div className="glaucoma-prevencion-carrusel">
    <button className="glaucoma-carrusel-btn izquierda">‹</button>

    <div className="glaucoma-tarjeta-prevencion-carrusel">
      <img src="/images/glaucoma/examen1.png" alt="Ícono 1" className="glaucoma-prevencion-tarjeta-icono" />
      <h3 className="glaucoma-tarjeta-prevencion-titulo">Examen ocular</h3>
      <p className="glaucoma-tarjeta-prevencion-descripcion">
        Si usted está en riesgo de glaucoma debe hacerse un examen oftalmológico antes de los 40 años.
      </p>
    </div>

      <div className="glaucoma-tarjeta-prevencion-carrusel-central">
        <div className="glaucoma-prevencion-modelo-snellen">
        <Canvas camera={{ position: [-10, 8, 0], fov: 20 }}>
          <Lights />            
          <Controls />
          <Environment preset="sunset" background /> 
          <ambientLight intensity={1} />
              <directionalLight
                position={[2, 6.5, 1]}
                intensity={1}
                castShadow={true}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={1}
                shadow-camera-far={10}
              />
              
          <OrbitControls target={[0, 1.2, 0]} />
          <SnellenTable position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}   scale={0.8} />

          <Text
            
            position={[1, 2, -1]}
            fontSize={0.4}
            color="black"
            anchorX="center"
            anchorY="middle"
            maxWidth={4}
            rotation={[0, -Math.PI / 2, 0]} 
          >
             Tabla Snelle
          </Text>

          <Title
           title={"✧"} 
           position={[0, 0, 0]} // aún más arriba
           fontSize={0.25}
           />

        </Canvas>

        </div>
        <h3 className="glaucoma-prevencion-titulo-central">Examen ocular</h3>
        <p className="glaucoma-prevencion-descripcion-central">
          Un examen ocular puede ayudar a detectar glaucoma de ángulo abierto oportunamente, cuando es más fácil de tratar. Ignorar la salud visual puede llevar a una disminución de la agudeza visual y un riesgo de enfermedades.
        </p>
    </div>

    <div className="glaucoma-tarjeta-prevencion-carrusel">
      <img src="/images/glaucoma/examen3.png" alt="Ícono 3" className="glaucoma-prevencion-tarjeta-icono" />
      <h3 className="glaucoma-tarjeta-prevencion-titulo">Examen ocular</h3>
      <p className="glaucoma-tarjeta-prevencion-descripcion">
        Las personas deben hacerse un examen oftalmológico completo a los 40 años.
      </p>
    </div>

    <button className="glaucoma-carrusel-btn derecha">›</button>
  </div>

  <p className="glaucoma-prevencion-alerta">Esta enfermedad no puede prevenirse</p>

  <div className="glaucoma-prevencion-barras-container">
    <div className="glaucoma-prevencion-barra">
      <img src="/images/glaucoma/stat2.png" alt="icon" className="glaucoma-prevencion-barra-icono" />
      <span>Personas con glaucoma</span>
      <div className="glaucoma-prevencion-barra-progreso">
        <div className="progreso" style={{ width: '2%', background: '#FFB400' }}></div>
        <span>2%</span>
      </div>
    </div>

    <div className="glaucoma-prevencion-barra">
      <img src="/images/glaucoma/stat2.png" alt="icon" className="glaucoma-prevencion-barra-icono" />
      <span>Personas con tratamiento</span>
      <div className="glaucoma-prevencion-barra-progreso">
        <div className="progreso" style={{ width: '50%', background: '#199ED9' }}></div>
        <span>50%</span>
      </div>
    </div>
  </div>
</section>

       {/* =============== TRATAMIENTO ================*/}

<section className="glaucoma-tratamiento-container">
        <div className="glaucoma-tratamiento-box">
          {showVideo ? (
            <div className="glaucoma-tratamiento-video-wrapper">
              <video
                className="glaucoma-tratamiento-video"
                controls
                autoPlay
                src="/images/tratamiento-glaucoma.mp4" 
              />
            </div>
          ) : (
            <>
              <h2 className="glaucoma-tratamiento-titulo">TRATAMIENTO</h2>
              <p className="glaucoma-tratamiento-descripcion">
                Si tiene glaucoma, es importante empezar el tratamiento de inmediato. Si bien el tratamiento no reparará el daño a su visión, puede evitar que empeore. 
                Medicamentos: Las gotas de receta médica para los ojos son el tratamiento más común. Disminuyen la presión en el ojo y previenen daños en el nervio óptico.
                Tratamiento láser: Para disminuir la presión en el ojo, los oculistas pueden usar un láser para ayudar a que el líquido del ojo pueda drenar. Es un procedimiento simple que se puede hacer en la consulta del médico.
                Cirugía: Si los medicamentos y el tratamiento con láser no funcionan, su médico podría sugerirle una cirugía. Hay varios tipos diferentes de cirugía que pueden ayudar a drenar el líquido del ojo.
              </p>
              <button
                className="glaucoma-tratamiento-boton"
                onClick={() => setShowVideo(true)}
              >
                VÍDEO INFORMATIVO
              </button>
            </>
          )}
        </div>
      </section>

      <section className="glaucoma-modelo-solo-container">
        <div className="glaucoma-modelo-solo">
          <Canvas camera={{ position: [0, -10, 10], fov: 45 }}>
            <ambientLight intensity={1} />
                        <directionalLight
                          position={[2, 5, 2]}
                          intensity={1}
                          castShadow={true}
                          shadow-mapSize-width={1024}
                          shadow-mapSize-height={1024}
                          shadow-camera-near={1}
                          shadow-camera-far={10}
                        />
            <OrbitControls target={[0, 1.1, 0]} enableZoom={true} />
            <MattSmith position={[0, 0, 0]} rotation={[0, Math.PI, 0]} scale={1.5} />
            <Title title={"✧"} />
          </Canvas> 
        </div>
      </section>



    </>
  );
};

export default QueEsGlaucoma;
