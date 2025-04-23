import './QueEsCatarata.css';
import ModeloCatarata3D from './ModeloCatarata3D';
import { Link } from 'react-router';

const QueEsCatarata = () => {
  return (
    <div className="que-es-container">

      <h1 className="titulo">CATARATAS</h1>

      <div className="imagenes">
        <img src="/images/catarata/catarata-anatomico.jpg" alt="Anatomía de catarata" className="img-cuadrada" />
        <img src="/images/catarata/catarata-persona-1.jpg" alt="Catarata persona 1" className="img-circular" />
        <img src="/images/catarata/catarata-persona-2.jpg" alt="Catarata persona 2" className="img-cuadrada" />
        <img src="/images/catarata/catarata-persona-3.jpg" alt="Catarata persona 3" className="img-circular" />
      </div>


      <div className="texto">
        <p>
          Una catarata es un área nublada en el cristalino, es decir, el “lente” de su ojo
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
          <button className="btn-rojo">TRATAMIENTOS</button>
        </Link>

        <Link to="/cataratas/que-es/modelo-3d">
          <button className="btn-azul">EXPLORA EL MODELO 3D</button>
        </Link>
      </div>
    </div>
  );
};

export default QueEsCatarata;
