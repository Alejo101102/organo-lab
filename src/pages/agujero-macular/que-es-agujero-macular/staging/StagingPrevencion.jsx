import { Environment } from '@react-three/drei'
import React from 'react'

const StagingPrevencion = () => {
  return (
    <>
        <Environment 
            files={['/staging/agumac-hdris/hospital_room.hdr']}
            
            background
        />
    </>
  )
}

export default StagingPrevencion