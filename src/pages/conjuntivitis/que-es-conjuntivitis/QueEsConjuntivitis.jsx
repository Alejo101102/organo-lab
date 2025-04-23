import './QueEsConjuntivitis.css';
import { Link } from 'react-router';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Footer from '../../../layout/footer/Footer';
import { Model } from '../ModelosConjuntivitis/QueEsConjuntivitisModel';

const QueEsConjuntivitis = () => {
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
          <Canvas camera={{ position: [0, 0, 0.3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 2, 3]} intensity={1} />
            <OrbitControls />
            <Model scale={4}/>
          </Canvas>
        </div>

        <img
          src="/images/conjuntivitis/QueEsConjuntivitisPersona.jpg"
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

      <div className="botones">
        <Link to="/conjuntivitis/sintomas">
          <button className="btn-rojo">SÍNTOMAS</button>
        </Link>

        <Link to="/conjuntivitis/tratamientos">
          <button className="btn-rojo">TRATAMIENTOS</button>
        </Link>

        <Link to="/conjuntivitis/modelo-3d">
          <button className="btn-azul">EXPLORA EL MODELO 3D</button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default QueEsConjuntivitis;
