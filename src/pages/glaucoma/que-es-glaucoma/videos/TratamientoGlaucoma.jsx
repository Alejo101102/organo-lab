// src/pages/glaucoma/que-es-glaucoma/videos/TratamientoGlaucoma.jsx
import { useVideoTexture } from '@react-three/drei';

const TratamientoGlaucoma = () => {
  const texture = useVideoTexture('/images/tratamiento-glaucoma.mp4', {
    muted: true,
    loop: true,
    autoplay: true,
    crossOrigin: 'anonymous',
  });

  return (
    <mesh position={[0, 1, 0]}>
      <planeGeometry args={[4, 2]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

export default TratamientoGlaucoma;
