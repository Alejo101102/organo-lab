import { Html } from '@react-three/drei'
import "./TitleConjuntivits.css"

const TitleConjuntivitis = ({ title }) => {
  return (
    <Html center position={[15, 4, 0]} distanceFactor={50} wrapperClass='title' occlude>
        <h1>{title}</h1>
    </Html>
  )
}

export default TitleConjuntivitis