import { Environment } from '@react-three/drei'
import React from 'react'

const Staging = () => {
  return (
    <>
        <Environment 
            files={['/staging/catarata/hdris/childrens_hospital.hdr']}
            
            background
        />
    </>
  )
}

export default Staging