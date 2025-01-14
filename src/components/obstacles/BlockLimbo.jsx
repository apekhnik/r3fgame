import React, {useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {RigidBody} from "@react-three/rapier";
import BlockUpDown from "./BlockUpDown.jsx";
import {boxGeometry} from "../../assets/Geometry.js";
import {floorMaterial, obstacleMaterial} from "../../assets/Materials.js";

const BlockLimbo = ({position = [0 , 0 , 0]}) => {
	const obstacle = useRef();
	const [timeOffset] = useState(() =>
		(Math.random() * Math.PI * 0.2)
	);
	useFrame((state) => {
		const time = state.clock.getElapsedTime();


		const y = Math.sin(time + timeOffset) + 1.5;

		obstacle.current.setNextKinematicTranslation({
			x: position[0],
			y: position[1]+ y,
			z: position[2]
		});

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

export default BlockUpDown;