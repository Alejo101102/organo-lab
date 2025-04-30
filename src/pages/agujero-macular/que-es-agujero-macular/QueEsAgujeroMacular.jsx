import React from 'react'
import './QueEsAgujeroMacular.css'
import { Canvas } from '@react-three/fiber'
import { Link} from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import InternEye from '../models-3d/InternEye'


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
    <div className="que-es-container">

      <h1 className="titulo">AGUJERO MACULAR</h1>

      <div className="contenedor-agujero-macular">
        <img src="/images/agujero-macular/agujero-macular-anatomico.jpg" alt="Anatomía del Agujero Macular" className="img-cuadrada" />

        <div className="modelo-3d-container"
          ref={modelContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleModelLeave}
        >
          {showTooltip && (
            <div className="modelo-tooltip" style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y - 30,
              position: 'fixed'
            }}>
              Ver Modelo 3D
            </div>
          )}

          <div className="modelo-3d">
            <Canvas camera={{ position: [8.5, 3.5, -10], fov: 17 }}
              style={{width: '300px', height: '180px'}}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 2, 2]} intensity={1} />
              <group
                rotation={[0, Math.PI*55/ 180, 0]}
                position={[-0.15, 0, 0]}
                onPointerOver={() => setShowTooltip(true)}
                onPointerOut={() => setShowTooltip(false)}
                onClick={() => navigate('/agujero-macular/que-es/modelo-3d')}
              >
                <InternEye scale={10} physics={false} rotate={false} />
              </group>
            </Canvas>
          </div>
        </div>
        <img src="/images/agujero-macular/agujero-macular-persona.jpg" alt="Agujero Macular en Persona" className="img-circular" />
      </div>


      <div className="texto">
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

      <div className="botones">
        <Link to="/glaucoma/sintomas">
          <button className="btn-rojo">SÍNTOMAS</button>
        </Link>

        <Link to="/glaucoma/tratamientos">
          <button className="btn-rojo">TRATAMIENTOS</button>
        </Link>

      </div>
    </div>
  );
};

export default QueEsAgujeroMacular;