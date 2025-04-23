
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models-3d/que_es_conjuntivitis.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.SickEye101_1.geometry} material={materials.Bones} />
      <mesh geometry={nodes.SickEye101_2.geometry} material={materials.Skin} />
      <mesh geometry={nodes.SickEye101_3.geometry} material={materials.Lens} />
      <mesh geometry={nodes.SickEye101_4.geometry} material={materials.TarsalPlateUpperEyelid} />
      <mesh geometry={nodes.SickEye101_5.geometry} material={materials.TarsalPlateLowerEyelid} />
      <mesh geometry={nodes.SickEye101_6.geometry} material={materials.OpticPartOfRightRetina} />
      <mesh geometry={nodes.SickEye101_7.geometry} material={materials.Choroid} />
      <mesh geometry={nodes.SickEye101_8.geometry} material={materials.Cornea} />
      <mesh geometry={nodes.SickEye101_9.geometry} material={materials.RightLacrimalCaniculus} />
      <mesh geometry={nodes.SickEye101_10.geometry} material={materials.RightOpticNerveInternal} />
      <mesh geometry={nodes.SickEye101_11.geometry} material={materials.RightOpticNerveExternal} />
      <mesh geometry={nodes.SickEye101_12.geometry} material={materials.RetinalVeins} />
      <mesh geometry={nodes.SickEye101_13.geometry} material={materials.RetinalArteries} />
      <mesh geometry={nodes.SickEye101_14.geometry} material={materials.Sclera} />
      <mesh geometry={nodes.SickEye101_15.geometry} material={materials.MucousMembrane} />
    </group>
  )
}

useGLTF.preload('/models-3d/que_es_conjuntivitis.glb')
