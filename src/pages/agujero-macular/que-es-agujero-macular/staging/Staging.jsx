import { Environment } from '@react-three/drei'
import React from 'react'

const Staging = () => {
  return (
    <>
        <Environment 
            files={['/staging/agumac-hdris/park.hdr']}
            
            background
        />
    </>
  )
}

export default Staging