import EyeQuiz from './EyeQuiz';

function Cuestionario({ errores }) {
  return (
    <>
      <h2>Resultados</h2>


      {/* 👁️ Solo dejamos EyeQuiz que ya incluye el modelo y las preguntas */}
      <EyeQuiz errores={errores} />
    </>
  );
}

export default Cuestionario;
