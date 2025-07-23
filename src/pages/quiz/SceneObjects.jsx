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

  function PesoExtra({ y }) {
    const ref = useRef();

    useEffect(() => {
      if (ref.current) {
        // aplicar un impulso hacia abajo (y negativo)
        ref.current.applyImpulse({ x: 0, y: -10, z: 0 });
      }
    }, []);

    return (
      <RigidBody
        ref={ref}
        type="dynamic"
        restitution={0.3}
        friction={0.5}
        mass={900000000000000000}
        gravityScale={2} // 🔥 Triplica la gravedad para este cuerpo
      >
        <mesh position={[2.8, y, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
    );
  }


  return (
    <>
      <Physics>
      {/* Base circular roja */}
      <RigidBody type="fixed">
        <mesh position={[0, -1.65, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
          <meshStandardMaterial color="darkred" />
        </mesh>
      </RigidBody>

      
        {/* Suelo fijo (tabla marrón) */}
        <RigidBody mass={-0.000000001} type="dynamic" colliders="cuboid">
          <mesh position={[0, -1.5, 0]}>
            <boxGeometry args={[6, 0.3, 1]} />
            <meshStandardMaterial color="#a86b3f" />
          </mesh>
        </RigidBody>
      
        {/* Ojo principal */}
        <RigidBody mass={-0.0000000000001} ref={eyeRef} restitution={0.8} friction={0.1}>
          <mesh position={[0, 2, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </RigidBody>
      
      {/* Cubos extra de peso */}
      {[...Array(errores)].map((_, i) => (
        <PesoExtra key={i} y={5 + i * 0.6} /> // cada cubo más alto
      ))}


      </Physics>

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
