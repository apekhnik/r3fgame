import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Level from './levels/Level.jsx'
import Lights from './Lights.jsx'
import { Player } from './Player.jsx'
import useGame from './stores/useGame.js'

export default function Experience()
{
    const blockCount = useGame(state => state.blockCount);
    const seed = useGame(state => state.blockSeed)

    return <>

        <OrbitControls makeDefault />
        <Physics>
            <Lights />
            <Level count={blockCount} seed={seed}/>
            <Player/>
        </Physics>


    </>
}