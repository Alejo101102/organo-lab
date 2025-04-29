import './QueEsConjuntivitis.css';
import { Link, useNavigate } from 'react-router-dom'; // Usamos react-router-dom para enlaces
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from '../ModelosConjuntivitis/QueEsConjuntivitisModel';

const QueEsConjuntivitis = () => {

  const navigate = useNavigate();

  return (
    <div className="que-es-container">
      <h1 className="titulo">CONJUNTIVITIS</h1>

      <div className="imagenes">
        <img
          src="/images/conjuntivitis/QueEsConjuntivitisAnatomia.jpg"
          alt="Anatomía de Conjuntivitis"
          className="img-cuadrada"
        />

        <div className="modelo-3d">
          <Canvas 
            style={{ width: '300px', height: '200px' }}
            camera={{ position: [0, 0, 0.3] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 2, 3]} intensity={1} />
            <OrbitControls />
            <Model scale={4} onClick={() => navigate('/conjuntivitis/que-es/modelo-3d')} />
          </Canvas>
        </div>

        <img
          src="/images/conjuntivitis/QueEsConjuntivitisPersona.jpeg"
          alt="Conjuntivitis persona 1"
          className="img-cuadrada"
        />
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

      <div className="mensaje-informativo">
        <p>Haz clic sobre el modelo 3D para verlo más de cerca en un entorno mejorado.</p>
      </div>

      <div className="botones">
        <Link to="/conjuntivitis/sintomas">
          <button className="btn-rojo">SÍNTOMAS</button>
        </Link>

        <Link to="/conjuntivitis/tratamientos">
          <button className="btn-azul">TRATAMIENTOS</button>
        </Link>
      </div>

    </div>
  );
};

export default QueEsConjuntivitis;
