import { Environment } from '@react-three/drei'
import React from 'react'

const Staging = () => {
  return (
    <>
        <Environment 
            files={['/staging/catarata/hdris/hospital_room.hdr']}
            
            background
        />
    </>
  )
}

export default Staging