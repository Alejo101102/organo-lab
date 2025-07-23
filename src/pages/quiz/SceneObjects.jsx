import { Physics, RigidBody } from '@react-three/rapier';
import { useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';


function SceneObjects({ errores = 0 }) {
  const eyeRef = useRef();

  // Aplica torque al ojo si hay errores
  useEffect(() => {
    if (!eyeRef.current) return;

    const torqueAmount = errores * 0.4; // Aumenta para que se note más
    eyeRef.current.applyTorqueImpulse({ x: 0, y: 0, z: -torqueAmount }, true);

    // Si falló 3 o más preguntas, se deja caer el ojo
    if (errores >= 3) {
      eyeRef.current.setGravityScale(2); // hace que el ojo caiga más rápido
    } else {
      eyeRef.current.setGravityScale(1); // vuelve a la normalidad si no ha perdido
    }
  }, [errores]);

  function PesoExtra({ x }) {
    return (
      <RigidBody type="dynamic" restitution={0.3} friction={0.5}>
        <mesh position={[x, 4, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
    );
  }

  return (
    <>
      {/* Suelo fijo */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6, 0.3, 1]} />
          <meshStandardMaterial color="#a86b3f" />
        </mesh>
      </RigidBody>

      {/* Base circular roja */}
      <RigidBody type="fixed">
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
          <meshStandardMaterial color="darkred" />
        </mesh>
      </RigidBody>

      {/* Ojo principal */}
      <RigidBody ref={eyeRef} restitution={0.6} friction={0.5}>
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </RigidBody>

      {/* Cubos extra de peso */}
      {[...Array(errores)].map((_, i) => (
        <PesoExtra key={i} x={1 + i * 0.4} />
      ))}

      {errores >= 3 && (
        <Html position={[0, 3, 0]}>
            <div style={{
            color: 'white',
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
            padding: '20px',
            borderRadius: '10px',
            fontSize: '1.5rem',
            fontWeight: 'bold'
            }}>
            ¡Has perdido!
            </div>
        </Html>
        )}

    </>
  );
}

export default SceneObjects;
