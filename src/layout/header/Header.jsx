import React from 'react';
import './Header.css';
import { NavLink } from 'react-router';
import logo from '../../assets/logo-letra-blanca.png';

const Header = () => {
  return (
    <header>
      <nav>
        <img src={logo} alt="Logo" className="logo" />
        
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

          <NavLink to="/inicio-sesion" end className="login-link">Iniciar Sesión</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;