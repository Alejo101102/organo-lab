import { useGLTF } from "@react-three/drei";


const InternEye = (props) => {
    const {nodes, materials} = useGLTF('/models-3d/agujero-macular/intern-eye.glb');
    return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.HumorVitreus.geometry}
          material={materials.VitreusMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ZonulaCiliaris.geometry}
          material={materials.CiliarisMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CorpusCiliaris.geometry}
          material={materials.CorpusCiliarisMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Iris.geometry}
          material={materials.IrisMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chroidea.geometry}
          material={materials.ChroideaMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sclera.geometry}
          material={materials.ScleraMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cornea.geometry}
          material={materials.CorneaMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Arteries.geometry}
          material={materials.ArteriesMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SideHumorVitreus.geometry}
          material={materials.SideHumorVitreusMaterial}
        />
      </group>
    )
  }

  export default InternEye;

  useGLTF.preload('/models-3d/agujero-macular/intern-eye.glb');
  