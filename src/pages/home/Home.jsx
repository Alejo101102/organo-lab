import React from 'react'
import {useNavigate } from 'react-router'
import { useCallback } from 'react'
import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate("/corazon", {
      state: { userData: {displayName: "OrganoLab"}},
    });
  }, [navigate]);
  
  return (
    <div className='home'>
      <h1>Inicio</h1>
      <button onClick={handleClick}>Ver más enfermedades</button>
    </div>
  )
}

export default Home