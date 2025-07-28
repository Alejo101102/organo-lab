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
    <div className="login-container">
          <img className="inicio-sesion-imagen"
          src="/images/inicio-sesion/inicio-sesion.png"
          alt="Ilustración"
        />

      <div className="login-box">
        <h2 className="login-titulo">Login</h2>
        <p className="login-subtitulo">
          Oye, ingresa tus datos para iniciar sesión en tu cuenta
        </p>

        <button className="login-google-btn" onClick={handleLogin}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="login-google-icon"
          />
          Google
        </button>
      </div>
    </div>
    </>
  );
}

export default InicioSesion;
