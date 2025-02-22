import React from 'react';
import './Header.css';
import { NavLink } from 'react-router';
import logo from '../../assets/logo-letra-blanca.png'; // Ajusta la ruta según tu estructura

const Header = () => {
  return (
    <header>
      <nav>
        <img src={logo} alt="Logo" className="logo" />
        <NavLink to="/" className="brand">
          OrganoLab
        </NavLink>
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/quiz" end>
          Quiz
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;