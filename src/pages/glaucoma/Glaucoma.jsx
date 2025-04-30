/////
import React from 'react'
import './Glaucoma.css'
import QueEsGlaucoma from './que-es-glaucoma/QueEsGlaucoma'
import { Outlet } from 'react-router-dom'

const Glaucoma = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Glaucoma