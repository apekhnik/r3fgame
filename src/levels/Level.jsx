import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import React, { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorMaterial = new THREE.MeshStandardMaterial({color: 'red'});
const floor1Material = new THREE.MeshStandardMaterial({color: 'greenyellow'});
const obstacleMaterial = new THREE.MeshStandardMaterial({color: 'orangered'});
const wallMaterial = new THREE.MeshStandardMaterial({color: 'slategrey'});

const BlockStart = ({position = [0 , 0 , 0]}) => {
    return <>
        <group position={position}>
            <mesh 
                geometry={boxGeometry} 
                material={floorMaterial}
                scale={[4, 0.2, 4]}
                receiveShadow
            >
            </mesh>
        </group>
    </>
}

const BlockEnd = ({position = [0 , 0 , 0]}) => {
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
                material={floorMaterial}
                scale={[4, 0.2, 4]}
                receiveShadow
            >
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
                material={floor1Material}
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
                material={floor1Material}
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
                material={floor1Material}
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

const BlockUpDown = ({position = [0 , 0 , 0]}) => {
    const obstacle = useRef();
    const [timeOffset] = useState(() => 
        (Math.random() * Math.PI * 0.2)
    );
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        

        const x = Math.sin(time + timeOffset) * 1.25;

        obstacle.current.setNextKinematicTranslation({
            x: position[0] + x,
            y: position[1] + 0.75, 
            z: position[2]
        });

    })

    return <>
        <group position={position}>
            <mesh 
                geometry={boxGeometry} 
                material={floor1Material}
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
                    scale={[1.5, 1.5, 0.3]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    </>
}

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

export default function Level({count = 5, types = [
    BlockSpinner,
    BlockLimbo,
    BlockAxe,
    BlockUpDown
],
    seed = 0
}) {
    const blocks = useMemo(() => {
        const blocks = []

        for(let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)]
            blocks.push(type);
        }

        return blocks
    }, [count, types, seed])


	return (
		<>
		    <BlockStart position={[0, 0, 0]}/>
            {blocks.map((Block, index) => <Block 
                position={[0, 0, -(index + 1) * 4]}
                key={index}
            />)}
            <BlockEnd position={[0, 0, -(count + 1 ) * 4]}/>
            <Bounds length={count + 2} />
		</>
	)
}
