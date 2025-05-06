import './QueEsGlaucoma.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Footer from '../../../layout/footer/Footer';
import EyeWithGlaucoma from '../models-3d/EyeWithGlaucoma';
import { useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import { Link } from 'react-router';

const QueEsGlaucoma = () => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const modelContainerRef = useRef(null);

  const handleMouseMove = (event) => {
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleModelHover = () => {
    setShowTooltip(true);
  };

  const handleModelLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="que-es-container">
      <h1 className="titulo">GLAUCOMA</h1>

      <div className="imagenes">
        <div
          className="modelo-3d-container"
          ref={modelContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleModelHover}
          onMouseLeave={handleModelLeave}
        >
          {showTooltip && (
            <div
              className="modelo-tooltip"
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y - 30,
                position: 'fixed'
              }}
            >
              Ver modelo 3D
            </div>
          )}

          <div className="modelo-3d">
            <Canvas camera={{ position: [0, 0, 6], fov: 25 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 2, 2]} 
              intensity={1} 
              castShadow={true}
              shadow-mapSize-width={1024}  // Mejor resolución de sombras
              shadow-mapSize-height={1024}
              shadow-camera-near={0.1}
              shadow-camera-far={10}
              />
              <OrbitControls enableZoom={true} />
              <group
                onPointerOver={handleModelHover}
                onPointerOut={handleModelLeave}
                onClick={() => navigate('/glaucoma/que-es/modelo-3d')}
                rotation={[-Math.PI * 90 / 180, Math.PI * 55 / 180, 0]}
              >
                <EyeWithGlaucoma scale={0.007} rotate={false} />
              </group>
            </Canvas>
          </div>
        </div>
      </div>

      <div className="texto">
        <p>
          El <strong>glaucoma</strong> es un grupo de enfermedades de los ojos que pueden causar pérdida de visión y ceguera al dañar el nervio ubicado en la
          parte posterior del ojo, conocido como nervio óptico. Con frecuencia, el daño al nervio óptico es causado por el aumento de la presión en el ojo. Esta se llama presión intraocular.
        </p>
        <p>
          Existen muchos tipos diferentes de glaucoma, pero el tipo más común en los Estados Unidos se conoce como glaucoma de ángulo abierto. Este tipo es al que la mayoría de las personas se refiere cuando habla de glaucoma. Hay otros tipos de glaucomas menos comunes, como el glaucoma de ángulo cerrado y el glaucoma congénito.
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

export default QueEsGlaucoma;