import React from 'react'
import './Cataratas.css'
import { Outlet } from 'react-router-dom';

const Cataratas = () => {
  return (
    <div>
      <Outlet /> {/* Renderiza las rutas anidadas */}
    </div>
  );
};

export default Cataratas;