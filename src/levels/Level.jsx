import {useGLTF, useTexture} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {CuboidCollider, RigidBody} from '@react-three/rapier'
import React, {useMemo, useRef, useState} from 'react'
import * as THREE from 'three'
import BlockUpDown from "../components/obstacles/BlockUpDown.jsx";
import BlockLimbo from "../components/obstacles/BlockLimbo.jsx";
import BlockAxe from "../components/obstacles/BlockAxe.jsx";
import BlockSpinner from "../components/obstacles/BlockSpinner.jsx";
import {floorMaterial} from "../assets/Materials.js";
import Bounds from "../components/Bounds.jsx";
import {boxGeometry} from "../assets/Geometry.js";



const BlockStart = ({position = [0, 0, 0]}) => {
    return <>
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                scale={[4, 0.2, 4]}
                receiveShadow
            >
                <meshStandardMaterial color={'green'}/>
            </mesh>
        </group>
    </>
}

const BlockEnd = ({position = [0, 0, 0]}) => {
    const humberger = useGLTF('./hamburger.glb')
    // const humberger = useGLTF('./models/axe/axe.glb')
    const bakedTexture = useTexture('./models/axe/axebaked.jpg')
    bakedTexture.flipY = false

    humberger.scene.children.forEach((mesh) => {
        mesh.castShadow = true;
        // mesh.material.map = bakedTexture;
    })

    return <>
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                scale={[4, 0.2, 4]}
                receiveShadow
            >
                <meshStandardMaterial color={'blue'}/>
            </mesh>
            <RigidBody
                type='fixed'
                colliders='hull'
                friction={0.2}
                restitution={0}
                position={[0, 0.25, 0]}
            >
                <primitive
                    scale={0.2}
                    object={humberger.scene}
                />
            </RigidBody>
        </group>
    </>
}



export default function Level({count = 5, types = [
    // BlockLimbo,
    // BlockAxe,
    // BlockUpDown
]
}) {
    // const blocks = useMemo(() => {
    //     const blocks = []
    //
    //     for(let i = 0; i < count; i++) {
    //         const type = types[Math.floor(Math.random() * types.length)]
    //         blocks.push(type);
    //     }
    //
    //     return blocks
    // }, [count, types, seed])

    const blocks = [
        BlockUpDown,
        BlockAxe,
        BlockSpinner,

    ]


	return (
		<>
		    <BlockStart position={[0, 0, 0]}/>
            {blocks.map((Block, index) => <Block
                position={[0, 0, -(index + 1) * 4]}
                key={index}
            />)}
            <BlockEnd position={[0, 0, -(blocks.length + 1 ) * 4]}/>
            <Bounds length={blocks.length + 2} />
		</>
	)
}
