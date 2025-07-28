import React from 'react'
import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>¿QUIÉNES SOMOS?</h3>
          <p>
            Somos una empresa dedicada a la creación y 
            producción de páginas interactivas que brindan información 
            sobre el cuerpo humano, para suplir las necesidades 
            conceptuales y técnicas de todo público.
          </p>
        </div>

        <div className="footer-section">
          <h3>ENLACES RELEVANTES</h3>
          <ul className="footer-links">
            <li>
              <Link to="/mapa-sitio">Mapa del sitio</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          <img src="/icon.png" alt="OrganoLab" className="footer-logo" />
          OrganoLab ©
        </p>
      </div>
    </footer>
  );
};

export default Footer;