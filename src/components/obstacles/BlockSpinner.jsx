import React, {useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {RigidBody} from "@react-three/rapier";
import {boxGeometry} from "../../assets/Geometry.js";
import {floorMaterial, obstacleMaterial} from "../../assets/Materials.js";

const BlockSpinner = ({position = [0 , 0 , 0]}) => {
	const obstacle = useRef();
	const [speed] = useState(() =>
		(Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
	);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		const rotation = new THREE.Quaternion();
		rotation.setFromEuler(new THREE.Euler(0 , time * speed, 0));
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
					geometry={boxGeometry}
					material={obstacleMaterial}
					scale={[3, 0.5, 0.3]}
					castShadow
					receiveShadow
				/>
			</RigidBody>
		</group>
	</>
}

export default BlockSpinner;