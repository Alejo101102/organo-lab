import './QueEsCatarata.css';
import { Canvas } from '@react-three/fiber';
import { CataractEye } from "./models-3d/CataractEye";
import { BeginCataractEye } from "./models-3d/BeginCataractEye";
import { PreventionEye } from "./models-3d/PreventionEye";
import { useState } from 'react';
import LightsCatarataQueEs from './lights/LightsCatarataQueEs';
import Controls from './controls/Controls';
import { Physics, RigidBody } from '@react-three/rapier';
import Staging from './staging/Staging';
import TitleCatarata from './texts/TitleCatarata';
import LightsCatarataSintomas from './lights/LightsCatarataSintomas';
import { KeyboardControls } from '@react-three/drei';
import LightsCatarataPrevencion from './lights/LightsCatarataPrevencion';
import Text2DCatarata from './texts/Text2DCatarata';
import Text3DCatarata from './texts/Text3DCatarata';
import { EyeTreatment } from './models-3d/EyeTreatment';
import LightsCatarataTratamiento from './lights/LightsCatarataTratamiento';
import AudioCatarata from './audio/AudioCatarata';

const tarjetas = [
  {
    img: "/images/catarata/prevencion/alimentacion.png",
    titulo: "Alimentación saludable",
    texto: "Incluye muchas frutas, verduras, hojas verdes y granos enteros."
  },
  {
    img: "/images/catarata/prevencion/gafas.png",
    titulo: "Proteger sus ojos",
    texto: "Use gafas de sol o sombrero con visera para evitar rayos UV."
  },
  {
    img: "/images/catarata/prevencion/vision.png",
    titulo: "Evitar lesiones",
    texto: "Use protección ocular al realizar actividades de riesgo."
  }
];

const QueEsCatarata = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false); 
  const [indiceActivo, setIndiceActivo] = useState(1); // empieza con "Proteger sus ojos"

  const siguiente = () => {
    setIndiceActivo((prev) => (prev + 1) % tarjetas.length);
  };

  const anterior = () => {
    setIndiceActivo((prev) => (prev - 1 + tarjetas.length) % tarjetas.length);
  };




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
              <Canvas camera={{ position: [0, 2, 16]}} shadows={true} >
                <LightsCatarataQueEs />  
                <Staging />
                <Controls />
                <TitleCatarata title={"Catarata"} />
                <Text2DCatarata title={"¿Qué es una catarata?"} />
                <Text3DCatarata title={"¿Qué es?"} position={[-4.25, -1.6, 9.5]} />
                <group
                  onPointerOver={() => setShowTooltip(true)}
                  onPointerOut={() => setShowTooltip(false)}
                >
                  <Physics>

                    <RigidBody type="fixed" colliders="trimesh">
                      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow={true}>
                        <circleGeometry args={[12, 64]} />
                        <meshStandardMaterial color="black" />
                      </mesh>
                    </RigidBody>

                    <CataractEye scale={150} physics={false} position={[-0.7, 2.5, 1]} castshadow={true} /> {/*scale={7} position={[0, 1.2, 0]}*/}
                  </Physics>
                </group>
              </Canvas>
            </KeyboardControls>
          </div>
        </div>

      <div className="catarata-que-es-catarata-texto">
        <p>
          Una catarata es un área nublada en el cristalino, es decir, el "lente" de su ojo
          (la parte clara de su ojo, ubicada justo detrás del iris, que ayuda a enfocar la luz y proyectarla sobre la retina). 
          Las cataratas son muy comunes a medida que usted envejece. 
          En efecto, más de la mitad de todos los estadounidenses de 80 años o más tiene cataratas o ha tenido cirugía para 
          eliminarlas.
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
              <Canvas camera={{ position: [0, 2, 16]}} shadows={true} >
                <LightsCatarataSintomas />  
                <Controls />
                <Staging />
                <TitleCatarata title={"Catarata"} />
                <Text3DCatarata title={"Síntomas"} position={[-4.25, -1.6, 9.5]} />
                <Text2DCatarata title={"¿Cuales son sus síntomas?"} />
                <group
                  onPointerOver={() => setShowTooltip(true)}
                  onPointerOut={() => setShowTooltip(false)}
                >
                  <Physics>

                    <RigidBody type="fixed" colliders="trimesh">
                      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow={true}>
                        <circleGeometry args={[12, 64]} />
                        <meshStandardMaterial color="black" shadowSide={2} />
                      </mesh>
                    </RigidBody>

                    <BeginCataractEye scale={150} physics={false} position={[-0.7, 2.5, 1]} castshadow={true} /> {/*scale={7} position={[0, 1.2, 0]}*/}
                  </Physics>
                </group>
              </Canvas>
            </KeyboardControls>
          </div>
        </div>

      

        <div className="catarata-sintomas-texto">
          <p>
            Usted podría no tener síntomas al principio, cuando las cataratas son leves. 
            Pero a medida que las cataratas crecen, pueden causar cambios en su visión. Por ejemplo, usted podría notar que:
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
      <svg
            className="catarata-curva-separadora"
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,100 C360,300 1080,-100 1440,100 L1440,200 L0,200 Z"
            />
          </svg>
    </div>

    {/* =============== PREVENCIÓN ================*/}

    <div className='catarata-prevencion-container'>
      <h2 className="catarata-prevencion-titulo">PREVENCIÓN</h2>
        <div 
          className="catarata-modelo-3d-container"
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
          
          <div className="catarata-prevencion-modelo-3d" >
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
              <Canvas camera={{ position: [0, 3.5, 18]}} shadows={true} >
                <LightsCatarataPrevencion />  
                <Controls />
                <Staging />
                <TitleCatarata title={"Catarata"} />
                <Text3DCatarata title={"Prevención"} position={[-5, -1.6, 9]} />
                <Text2DCatarata title={"¿Cómo se previene?"} />
                <group
                  onPointerOver={() => setShowTooltip(true)}
                  onPointerOut={() => setShowTooltip(false)}
                >
                  <Physics>

                    <RigidBody type="fixed" colliders="trimesh">
                      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow={true}>
                        <circleGeometry args={[12, 64]} />
                        <meshStandardMaterial color="black" shadowSide={2} />
                      </mesh>
                    </RigidBody>

                    <PreventionEye scale={50} physics={false} position={[-0.7, 3.5, 2]} castshadow={true} rotation={[0, -Math.PI / 2, 0]} /> {/*scale={7} position={[0, 1.2, 0]}*/}
                  </Physics>
                </group>
              </Canvas>
            </KeyboardControls>
          </div>
        </div>

        <div className="catarata-prevencion-carrusel-container">
          <button className="catarata-prev-btn" onClick={anterior}>&#10094;</button>

          <div className="carrusel-enfocado">
            {tarjetas.map((tarjeta, i) => {
              const izquierda = (indiceActivo - 1 + tarjetas.length) % tarjetas.length;
              const derecha = (indiceActivo + 1) % tarjetas.length;

              let clase = "catarata-tarjeta-prevencion";
              if (i === indiceActivo) {
                clase = "catarata-tarjeta-prevencion enfocado";
              } else if (i === izquierda || i === derecha) {
                clase = "catarata-tarjeta-prevencion lateral";
              } else {
                clase = "catarata-tarjeta-prevencion";
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

          <button className="catarata-next-btn" onClick={siguiente}>&#10095;</button>
        </div>

        <p className="catarata-prevencion-alerta">Esta enfermedad no puede prevenirse</p>

        <div className="catarata-prevencion-barras-container">
          <div className="catarata-prevencion-barra">
            <img src="/images/catarata/prevencion/medidor.png" alt="icon" className="catarata-prevencion-barra-icono" />
            <span>Personas con catarata</span>
            <div className="catarata-prevencion-barra-progreso">
              <div className="catarata-progreso" style={{ width: '1.2%', background: '#FFB400' }}></div>
              <span>1.2%</span>
            </div>
          </div>

          <div className="catarata-prevencion-barra">
            <img src="/images/catarata/prevencion/medidor.png" alt="icon" className="catarata-prevencion-barra-icono" />
            <span>Personas con tratamiento</span>
            <div className="catarata-prevencion-barra-progreso">
              <div className="catarata-progreso" style={{ width: '35%', background: '#199ED9' }}></div>
              <span>35%</span>
            </div>
          </div>
        </div>
    </div>


    {/* =============== TRATAMIENTO ================*/}

    <div className='catarata-tratamiento-container'>
      <h2 className="catarata-tratamiento-titulo">TRATAMIENTO</h2>
        <div 
          className="catarata-modelo-3d-container"
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
          
          <div className="catarata-tratamiento-modelo-3d" >
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
              <Canvas camera={{ position: [0, 3.5, 18]}} shadows={true} >
                <LightsCatarataTratamiento />  
                <Controls />
                <Staging />
                <TitleCatarata title={"Catarata"} />
                <Text3DCatarata title={"Tratatamiento"} position={[-5.7, -1.6, 9]} />
                <Text2DCatarata title={"¿Cómo se trata?"} />
                <AudioCatarata />
                <group
                  onPointerOver={() => setShowTooltip(true)}
                  onPointerOut={() => setShowTooltip(false)}
                >
                  <Physics>

                    <RigidBody type="fixed" colliders="trimesh">
                      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow={true}>
                        <circleGeometry args={[12, 64]} />
                        <meshStandardMaterial color="black" shadowSide={2} />
                      </mesh>
                    </RigidBody>

                    <EyeTreatment scale={50} physics={false} position={[0, 3.5, 2]} castshadow={true} rotation={[0, -Math.PI / 2, 0]} /> {/*scale={7} position={[0, 1.2, 0]}*/}
                  </Physics>
                </group>
              </Canvas>
            </KeyboardControls>
          </div>
        </div>

        <div className="catarata-tratamiento-box">
          <div className="catarata-tratamiento-texto">
            <p>
              El único tratamiento para una catarata es la cirugía para extirparla. Si una catarata no le está dificultando la visión, 
              entonces no necesita cirugía. Las cataratas no dañan el ojo, de manera que puede someterse a la cirugía cuando usted y 
              el oftalmólogo decidan que es apropiado. La cirugía por lo regular se recomienda cuando usted no puede desempeñar actividades 
              normales como conducir, leer, mirar la computadora o pantallas de video, ni siquiera con el uso de anteojos. Dentro de las 
              cirugías está: <br />
              <br />
              • Lentes intraoculares monofocales.(Corrigen la visión lejana, pero el paciente sigue precisando gafas para ver de cerca).<br />
              • Lentes intraoculares multifocales (Permiten la visión a varias distancias: cerca, media y lejos, dependiendo de las necesidades de cada paciente. 
                Pueden ser bifocales o trifocales)
            </p>
          </div>
        </div>

        
    </div>    

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

export default QueEsCatarata;