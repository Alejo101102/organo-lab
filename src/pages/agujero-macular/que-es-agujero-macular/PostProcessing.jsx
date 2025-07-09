import { EffectComposer, Vignette } from '@react-three/postprocessing';
import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

const PostProcessing = () => {
  const { gl, size, camera, scene } = useThree();
  const vignetteRef = useRef();
  const [mouse, setMouse] = useState(new THREE.Vector2());

  // Actualiza posición del mouse cada frame
  useFrame(({ pointer }) => {
    const ndc = new THREE.Vector2(pointer.x * 2 - 1, -(pointer.y * 2 - 1));
    setMouse(ndc);
  });

  return (
    <>
      <EffectComposer>
        {/* Viñeta negra básica */}
        <Vignette
          eskil={false}
          offset={0.8}
          darkness={1.}
          blendFunction={THREE.AdditiveBlending}
        />
        {/* Aquí podrías agregar efectos personalizados basados en el cursor */}
      </EffectComposer>
    </>
  );
};

export default PostProcessing;