// src/pages/inicio-sesion/InicioSesion.jsx
import './InicioSesion.css'
import { signInWithPopup } from "firebase/auth";
import { useCallback } from 'react';
import useAuthStore from '../../stores/use-auth.store';
import { useNavigate } from 'react-router';


const InicioSesion = () => {
  const {loginWithPopup } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = useCallback(()=>{
    loginWithPopup ()
    .then(()=>navigate("/"))
    .catch(()=>navigate("/"));
  }, [loginWithPopup , navigate]);

  return (
    <>
      <h2>Continua con Google</h2>
      <button type="button" title="Iniciar sesión con Google" onClick={handleLogin}
      >
        Iniciar sesión
      </button>
    </>
  );
}

export default InicioSesion;
