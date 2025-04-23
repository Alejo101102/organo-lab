import './QueEsGlaucoma.css';
import { Link } from 'react-router';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Footer from '../../../layout/footer/Footer';
import EyeWithGlaucoma from '../models-3d/EyeWithGlaucoma';


const QueEsGlaucoma = () => {
    return (
      <div className="que-es-container">
  
        <h1 className="titulo">GLAUCOMA</h1>
  
        <div className="imagenes">
          <img src="/images/glaucoma/glaucoma-anatomico.png" alt="Anatomía de Glaucoma" className="img-cuadrada" />
         
          <div className="modelo-3d">
            <Canvas camera={{ position: [0, 0, 6], fov: 25 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            <OrbitControls enableZoom={true} autoRotate />
            <EyeWithGlaucoma />
           </Canvas>
          </div>


          <img src="/images/glaucoma/glaucoma-persona-1.png" alt="Glaucoma persona 1" className="img-cuadrada" />
          
        </div>
  
  
        <div className="texto">
          <p>
          El **glaucoma es un grupo de enfermedades de los ojos que pueden causar pérdida de visión y ceguera al dañar el nervio ubicado en la
          conocido como nervio óptico. Con frecuencia, el daño al nervio óptico es causado por el aumento de la presión en el ojo. Esta se llama presión intraocular.
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
  
          <Link to="/glaucoma/modelo-3d">
            <button className="btn-azul">EXPLORA EL MODELO 3D</button>
          </Link>
        </div>

      </div>
    );
  };
  
  export default QueEsGlaucoma;
  