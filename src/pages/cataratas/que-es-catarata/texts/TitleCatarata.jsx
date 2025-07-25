import { Html } from '@react-three/drei'
import "./TitleCatarata.css/"

const TitleCtarata = ({ title }) => {
  return (
    <Html center position={[15, 6, 0]} distanceFactor={50} wrapperClass='titleCatarata' occlude>
        <h1>{title}</h1>
    </Html>
  )
}

export default TitleCtarata