import { Html } from '@react-three/drei'
import "./TextHTML.css"

const TextHTML = ({ texthtml }) => {
  return (
    <Html center position={[0, -1.5, 10]} distanceFactor={50} wrapperClass='texthtmlconjuntivits' occlude>
        <h1>{texthtml}</h1>
    </Html>
  )
}

export default TextHTML