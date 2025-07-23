import { useState } from 'react';
import EyeQuiz from './EyeQuiz';
import Instrucciones from './Instrucciones';
import './Instrucciones.css';

function Cuestionario({ errores }) {
  const [mostrarInstrucciones, setMostrarInstrucciones] = useState(true);

  return (
    <>
      {/* El juego siempre se muestra */}
      <EyeQuiz errores={errores} />

      {/* Las instrucciones se muestran encima hasta que se cierren */}
      {mostrarInstrucciones && (
        <Instrucciones onClose={() => setMostrarInstrucciones(false)} />
      )}
    </>
  );
}

export default Cuestionario;
