import React from 'react'
import { Link } from 'react-router'
import './MapaSitio.css'

const MapaSitio = () => {
    return (
        <div className="mapa-sitio">
            <div className="mapa-container">
                <h1>Mapa del Sitio</h1>
                <p className="mapa-descripcion">
                Encuentra fácilmente el contenido que buscas en OrganoLab
                </p>

                <div className="mapa-grid">
                {/* Página Principal */}
                <div className="mapa-section">
                    <div className="section-header">
                    <span className="section-icon">🏠</span>
                    <h2>Página Principal</h2>
                    </div>
                    <ul className="section-links">
                    <li>
                        <Link to="/" className="mapa-link">
                        Inicio
                        </Link>
                    </li>
                    </ul>
                </div>

                {/* Información Institucional */}
                <div className="mapa-section">
                    <div className="section-header">
                    <span className="section-icon">👥</span>
                    <h2>Información Institucional</h2>
                    </div>
                    <ul className="section-links">
                    <li>
                        <Link to="/quienes-somos" className="mapa-link">
                        Quiénes Somos
                        </Link>
                    </li>
                    </ul>
                </div>

                {/* Enfermedades Oculares */}
                <div className="mapa-section">
                    <div className="section-header">
                    <span className="section-icon">👁️</span>
                    <h2>Enfermedades Oculares</h2>
                    </div>
                    <ul className="section-links">
                    <li>
                        <Link to="/agujero-macular/que-es" className="mapa-link">
                        Agujero Macular
                        </Link>
                    </li>
                    <li>
                        <Link to="/cataratas/que-es" className="mapa-link">
                        Cataratas
                        </Link>
                    </li>
                    <li>
                        <Link to="/conjuntivitis/que-es" className="mapa-link">
                        Conjuntivitis
                        </Link>
                    </li>
                    <li>
                        <Link to="/glaucoma/que-es" className="mapa-link">
                        Glaucoma
                        </Link>
                    </li>
                    </ul>
                </div>

                {/* Evaluación */}
                <div className="mapa-section">
                    <div className="section-header">
                    <span className="section-icon">📝</span>
                    <h2>Evaluación</h2>
                    </div>
                    <ul className="section-links">
                    <li>
                        <Link to="/quiz" className="mapa-link">
                        Quiz Principal
                        </Link>
                    </li>
                    </ul>
                </div>

                {/* Área de Usuario */}
                <div className="mapa-section">
                    <div className="section-header">
                    <span className="section-icon">👤</span>
                    <h2>Área de Usuario</h2>
                    </div>
                    <ul className="section-links">
                    <li>
                        <Link to="/inicio-sesion" className="mapa-link">
                        Iniciar Sesión
                        </Link>
                    </li>
                    </ul>
                </div>

                {/* Navegación */}
                <div className="mapa-section">
                    <div className="section-header">
                    <span className="section-icon">🗺️</span>
                    <h2>Navegación</h2>
                    </div>
                    <ul className="section-links">
                    <li>
                        <Link to="/mapa-sitio" className="mapa-link active">
                        Mapa del Sitio
                        </Link>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    )
}

export default MapaSitio