import './QueEsCatarata.css';
import { Canvas } from '@react-three/fiber';
import { CataractEye } from "./models-3d/CataractEye";
import { Link, useNavigate } from 'react-router';
import { useRef, useState } from 'react';

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
    <div className="que-es-container">
      <h1 className="titulo">CATARATAS</h1>

      <div className="contenedor-cataratas">
        <img src="/images/catarata/catarata-anatomico.jpg" alt="Anatomía de catarata" className="img-cuadrada" />
        
        <div 
          className="modelo-3d-container"
          ref={modelContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleModelHover}
          onMouseLeave={handleModelLeave}
        >
          {showTooltip && (
            <div className="modelo-tooltip" style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y - 30, // Posicionado 40px arriba del cursor
              position: 'fixed'
            }}>
              Ver modelo 3D
            </div>
          )}
          
          <div className="modelo-3d">
            <Canvas camera={{ position: [0, 0, 0.4] }} style={{ width: '300px', height: '180px' }}>
              <ambientLight intensity={2.7} />
              <directionalLight position={[1, 2, 3]} intensity={1} />
              <group 
                rotation={[0, Math.PI * 55/180, 0]}
                position={[-0.05, 0, 0]}
                onPointerOver={() => setShowTooltip(true)}
                onPointerOut={() => setShowTooltip(false)}
                onClick={() => navigate('/cataratas/que-es/modelo-3d')}
              >
                <CataractEye scale={12} physics={false} rotate={false} />
              </group>
            </Canvas>
          </div>
        </div>
        
        <img src="/images/catarata/catarata-persona-2.jpg" alt="Catarata persona 2" className="img-cuadrada" />
      </div>

      <div className="texto">
        <p>
          Una catarata es un área nublada en el cristalino, es decir, el "lente" de su ojo
          (la parte clara de su ojo que ayuda a enfocar la luz). Las cataratas son muy comunes a medida que usted envejece. En efecto, más de la mitad de todos los estadounidenses de 80 años o más tiene cataratas o ha tenido cirugía para eliminarlas.
        </p>
        <p>
          Al principio, es posible que usted no note que tiene una catarata. Pero con el paso del tiempo, las cataratas pueden hacer que su visión se haga borrosa, difusa, o menos colorida. Podría tener problemas para leer o realizar otras actividades cotidianas
        </p>
      </div>

      

      <div className="botones">
        <Link to="/cataratas/sintomas">
          <button className="btn-rojo">SÍNTOMAS</button>
        </Link>

        <Link to="/cataratas/tratamientos">
          <button className="btn-azul">TRATAMIENTOS</button>
        </Link>
        {/*}
        <Link to="/cataratas/que-es/modelo-3d">
          <button className="btn-azul">EXPLORA EL MODELO 3D</button>
        </Link>*/}
      </div>
    </div>
  );
};

export default QueEsCatarata;