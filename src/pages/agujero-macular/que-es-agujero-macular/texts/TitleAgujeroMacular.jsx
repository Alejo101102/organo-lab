import { Html } from '@react-three/drei'
import "./TitleAgujeroMacular.css/"

const TitleAgujeroMacular = ({ title }) => {
  return (
    <Html center position={[12, 4, 10]} distanceFactor={30} wrapperClass='titleAgujeroMacular' occlude>
        <h1>{title}</h1>
    </Html>
  )
}

export default TitleAgujeroMacular