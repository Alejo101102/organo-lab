// EyeBalanceScene.jsx
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import SceneObjects from './SceneObjects';
import { OrbitControls } from '@react-three/drei'
import React from 'react'

export default function EyeBalanceScene({ errores }) {

    
  return (
    <Canvas className="quiz-juego-container"
      camera={{ position: [0, 3, 10], fov: 50 }}
      style={{ width: '100%', height: '500px', background: 'radial-gradient(circle at center, #0f0f3e, #0b0b2d)' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <OrbitControls />
      <Physics gravity={[0, -9.81, 0]}>
        <SceneObjects errores={errores} />
      </Physics>
    </Canvas>
  );
}

