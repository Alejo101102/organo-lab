import Eyes from '../../home/models-3d/Eyes';
import './QueEsConjuntivitis.css';
import { Link } from 'react-router';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Footer from '../../../layout/footer/Footer';

const QueEsConjuntivitis = () => {
  return (
    <div className="que-es-container">

      <h1 className="titulo">CONJUNTIVITIS</h1>

      <div className="imagenes">
        <img src="/images/conjuntivitis/conjuntivitis-anatomico.png" alt="Anatomía de Conjuntivitis" className="img-cuadrada" />
       
        <div className="modelo-3d">
          <Eyes />
        </div>

        <img src="/images/conjuntivitis/conjuntivitis-persona-1.png" alt="Conjuntivitis persona 1" className="img-cuadrada" />
        
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

    </div>
  );
};

export default QueEsConjuntivitis;
