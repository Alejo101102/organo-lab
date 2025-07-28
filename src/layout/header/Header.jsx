import React from 'react';
import './Header.css';
import { NavLink } from 'react-router';
import logo from '../../assets/logo-letra-blanca.png';
import useAuthStore from '../../stores/use-auth.store';

const Header = () => {
  const { userLooged, logout } = useAuthStore();

  return (
    <header>
      <nav>
        <NavLink to="/">
          <img src={logo} alt="Logo" className="logo" />
        </NavLink>
        
        <div className="nav-links">
          <NavLink to="/" end>Inicio</NavLink>

          <NavLink to="/quienes-somos" end>Quiénes Somos</NavLink>

          <div className="menu-item">
            <NavLink>Enfermedades</NavLink>
            <div className="submenu">
              <NavLink to="/agujero-macular/que-es">Agujero Macular</NavLink>
              <NavLink to="/cataratas/que-es">Cataratas</NavLink>
              <NavLink to="/conjuntivitis/que-es">Conjuntivitis</NavLink>
              <NavLink to="/glaucoma/que-es">Glaucoma</NavLink>
            </div>
          </div>
          
          <NavLink to="/quiz" end>Quiz</NavLink>

          {!userLooged ? (
            <NavLink to="/inicio-sesion" end className="login-link">Iniciar Sesión</NavLink>
          ) : (
            <div className="menu-item">
              <img
                src={userLooged.photoURL ? `${userLooged.photoURL}?t=${Date.now()}` : '/images/icons/bot.png'}
                alt="Perfil"
                className="profile-pic"
                title={userLooged.displayName}
                referrerPolicy="no-referrer"
              />
              <div className="submenu profile-submenu">
                <p className="user-name">{userLooged.displayName}</p>
                <button onClick={logout} className="logout-btn">Cerrar sesión</button>
              </div>
            </div>
          )}

        </div>
      </nav>
    </header>
  );
};

export default Header;