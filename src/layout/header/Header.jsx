import React from 'react';
import './Header.css';
import { NavLink } from 'react-router';
import logo from '../../assets/logo-letra-blanca.png';

const Header = () => {
  return (
    <header>
      <nav>
        <img src={logo} alt="Logo" className="logo" />
        <NavLink to="/" end>Inicio</NavLink>

        <div className="menu-item">
          <NavLink>Agujero Macular</NavLink>
          <div className="submenu">
            <NavLink to="/agujero-macular/que-es">¿Qué es?</NavLink>
            <NavLink to="/agujero-macular/sintomas">Síntomas</NavLink>
            <NavLink to="/agujero-macular/tratamiento">Tratamiento</NavLink>
          </div>
        </div>

        <div className="menu-item">
          <NavLink>Cataratas</NavLink>
          <div className="submenu">
            <NavLink to="/cataratas/que-es">¿Qué es?</NavLink>
            <NavLink to="/cataratas/sintomas">Síntomas</NavLink>
            <NavLink to="/cataratas/tratamiento">Tratamiento</NavLink>
          </div>
        </div>

        <div className="menu-item">
          <NavLink>Conjuntivitis</NavLink>
          <div className="submenu">
            <NavLink to="/conjuntivitis/que-es">¿Qué es?</NavLink>
            <NavLink to="/conjuntivitis/sintomas">Síntomas</NavLink>
            <NavLink to="/conjuntivitis/tratamiento">Tratamiento</NavLink>
          </div>
        </div>

        <div className="menu-item">
          <NavLink>Glaucoma</NavLink>
          <div className="submenu">
            <NavLink to="/glaucoma/que-es">¿Qué es?</NavLink>
            <NavLink to="/glaucoma/sintomas">Síntomas</NavLink>
            <NavLink to="/glaucoma/tratamiento">Tratamiento</NavLink>
          </div>
        </div>
        
        <NavLink to="/quiz" end>Quiz</NavLink>
        <NavLink to="/inicio-sesion" end>Iniciar Sesión</NavLink>
      </nav>
    </header>
  );
};

export default Header;
