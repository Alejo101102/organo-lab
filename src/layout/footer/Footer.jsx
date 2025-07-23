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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
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