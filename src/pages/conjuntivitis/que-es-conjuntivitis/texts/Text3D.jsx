import { Text3D } from '@react-three/drei'
import "./TitleConjuntivits.css"

const Text3d = ({ text3d }) => {
  return (
    <Text3D
      center
      position={[5.5, 8, 0]}
      distanceFactor={50}
      wrapperClass="text3d"
      occlude
      font="/fonts/alice.json"
      bevelEnabled
      bevelSize={0.1}
      bevelThickness={0.1}
      height={0.5}
      lineHeight={0.8}
      letterSpacing={0.01}
      size={5}
    >
      {text3d}
      <meshNormalMaterial/>
    </Text3D>
  )
}

export default Text3d
