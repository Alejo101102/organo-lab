import { Html } from '@react-three/drei'
import "./TitleAgujeroMacular.css/"

const TitleAgujeroMacular = ({ title, position = [0, 0, 0], distanceFactor = 30 }) => {
  return (
    <Html
      center
      position={position}
      distanceFactor={distanceFactor}
      wrapperClass='titleAgujeroMacular'
      occlude
    >
      <h1>{title}</h1>
    </Html>
  )
}

export default TitleAgujeroMacular