import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";

const Lights = () => {
  const targetRef = useRef();
  const spotLightRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (spotLightRef.current && targetRef.current) {
      spotLightRef.current.target = targetRef.current;
      scene.add(spotLightRef.current.target); // ¡IMPORTANTE!
    }
  }, [scene]);

  return (
    <>
      {/* Luz ambiental tenue para rellenar sombras */}
      <ambientLight intensity={0.3} />

      {/* Luz direccional blanca apuntando desde un costado */}
      <directionalLight
        position={[-10, -10, 10]} // lado derecho
        intensity={2}
        color="red"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* SpotLight blanca intensa lateral izquierda apuntando al centro */}
      <spotLight
        ref={spotLightRef}
        position={[-10, -10, 10]} // desde el lado izquierdo
        distance={30}
        color="red"
        intensity={150}
        angle={Math.PI / 4}
        penumbra={0.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.003}
        shadow-normalBias={0.02}
      />
      <object3D ref={targetRef} position={[0, 0, 0]} />

      {/* Luz puntual de refuerzo más tenue desde atrás */}
      <pointLight
        position={[-10, -10, 10]}
        intensity={0.6}
        color="red"
        castShadow={false}
      />
    </>
  );
};

export default Lights;
