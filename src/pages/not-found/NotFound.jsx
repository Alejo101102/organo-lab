import React from 'react';
import './NotFound.css';
import notFoundImage from '../../assets/not-found.png'; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src={notFoundImage} alt="Página no encontrada" className="not-found-image" />
    </div>
  );
};

export default NotFound;