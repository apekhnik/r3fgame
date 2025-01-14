import React, {useRef, useState} from "react";
import {useGLTF, useTexture} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {RigidBody} from "@react-three/rapier";
import BlockUpDown from "./BlockUpDown.jsx";
import {boxGeometry} from "../../assets/Geometry.js";
import {floorMaterial} from "../../assets/Materials.js";

const BlockAxe = ({position = [0 , 0 , 0]}) => {
	const obstacle = useRef();
	const model = useGLTF('./models/axe/axe.glb')
	const bakedTexture = useTexture('./models/axe/axebaked.jpg')
	bakedTexture.flipX = false

	const [timeOffset] = useState(() =>
		(Math.random() * Math.PI * 0.2)
	);
	useFrame((state) => {
		const time = state.clock.getElapsedTime();


		const x = Math.sin(time + timeOffset) * 1.25;

		obstacle.current.setNextKinematicTranslation({
			x: position[0] ,
			y: position[1] + 5.7,
			z: position[2]
		});

		const rotation = new THREE.Quaternion();
		rotation.setFromEuler(new THREE.Euler(0, 0, x));
		obstacle.current.setNextKinematicRotation(rotation);

	})

	return <>
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				material={floorMaterial}
				scale={[4, 0.2, 4]}
				receiveShadow
			/>
			<RigidBody
				ref={obstacle}
				type='kinematicPosition'
				restitution={0.2}
				friction={0}
				position={[0, 0.3, 0]}>
				<mesh
					geometry={model.nodes.axe.geometry}
					rotation={[0, 1.5, 0]}
					scale={[0.3, 5, 0.3]}
					castShadow
					receiveShadow
				>
					<meshStandardMaterial
						color="#6F6F6F"
						metalness={0.8}    // Increase metalness (1 is maximum)
						roughness={0.3}  // Decrease roughness (0 is the smoothest)
					/>
				</mesh>

			</RigidBody>
		</group>
	</>
}

export default BlockAxe;