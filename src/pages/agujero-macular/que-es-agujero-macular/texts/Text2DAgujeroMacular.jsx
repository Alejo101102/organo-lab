import { Text } from '@react-three/drei'

const Text2DAgujeroMacular = ({ title, position }) => {
  return (
    <Text
      anchorX="center"
      anchorY="middle"
      position={position}
      rotation={[0, -Math.PI/45, 0]} 
      color="#13132c"
      distanceFactor={50}
      wrapperClass="title"
      occlude
      fontSize={1.3}
      font="/fonts/roboto.ttf"
    >
      {title}
    </Text>
  )
}

export default Text2DAgujeroMacular
