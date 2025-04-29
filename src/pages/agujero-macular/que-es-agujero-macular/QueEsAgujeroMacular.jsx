import React from 'react'
import './QueEsAgujeroMacular.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Link } from 'react-router'
import InternEye from '../models-3d/InternEye'

const QueEsAgujeroMacular = () => {
    return (
      <div className="que-es-container">
  
        <h1 className="titulo">AGUJERO MACULAR</h1>
  
        <div className="imagenes">
          <img src="/images/agujero-macular/agujero-macular-anatomico.jpg" alt="Anatomía del Agujero Macular" className="img-cuadrada" />
         
          <div className="modelo-3d">
            <Canvas camera={{ position: [0, 0, 6], fov: 25 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            <OrbitControls enableZoom={true} autoRotate />
            <InternEye />
           </Canvas>
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
            Es más frecuente en mujeres y puede ser bilateral en algunos casos.
          <p>

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