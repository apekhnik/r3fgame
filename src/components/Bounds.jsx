import {CuboidCollider, RigidBody} from "@react-three/rapier";
import React from "react";
import Level from "../levels/Level.jsx";
import {boxGeometry} from "../assets/Geometry.js";
import {wallMaterial} from "../assets/Materials.js";

const Bounds = ({length = 1}) => {
	return <>
		<RigidBody type='fixed' restitution={0.2} friction={0}>
			<mesh
				position={[2.15, 0.15, -(length * 2) + 2]}
				geometry={boxGeometry}
				material={wallMaterial}
				scale={[0.3, 0.5, 4 * length]}
				castShadow
			/>
			<mesh
				position={[-2.15, 0.15, -(length * 2) + 2]}
				geometry={boxGeometry}
				material={wallMaterial}
				scale={[0.3, 0.5, 4 * length]}
				receiveShadow
			/>
			<mesh
				position={[0, 0.15, - (length * 4) + 2]}
				geometry={boxGeometry}
				material={wallMaterial}
				scale={[4, 0.5, 0.1]}
				receiveShadow
			/>
			<CuboidCollider
				// type="fixed"
				args={ [ 2, 0.1, 2 * length ] }
				position={ [ 0, 0, - (length * 2) + 2 ] }
				restitution={ 0.2 }
				friction={ 1 }
			/>
		</RigidBody>
	</>
}

export default Bounds;