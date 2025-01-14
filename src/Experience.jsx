import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Level from './levels/Level.jsx'
import Lights from './Lights.jsx'
import { Player } from './Player.jsx'
import useGame from './stores/useGame.js'
import LevelTwo from "./levels/LevelTwo.jsx";

export default function Experience()
{
    const blockCount = useGame(state => state.blockCount);
    const seed = useGame(state => state.blockSeed)
    const currentLevel = useGame(state => state.currentLevel)

    return <>

        <OrbitControls makeDefault />
        <Physics>
            <Lights />
                {currentLevel == 1 && <Level count={blockCount} seed={seed}/>}
                {currentLevel == 2 && <LevelTwo/>}
            <Player/>
        </Physics>


    </>
}