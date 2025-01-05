import { useKeyboardControls } from '@react-three/drei'
import { addEffect } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import useGame from './stores/useGame'

function Interface() {
		const time = useRef();
		const { phase, restart } = useGame(state => state)

		const {forward, leftward, backward, rightward, jump} = useKeyboardControls(
			state => state)

	useEffect(() => {
		const unsubscribeAddEffect = addEffect(() => {
			const state = useGame.getState();

			let elapsedtime = 0;
			if(state.phase === 'playing') {
				elapsedtime = Date.now() - state.startTime;
			}else if(state.phase === 'ended') {
				elapsedtime = state.endTime - state.startTime;
			}

			elapsedtime /= 1000;
			elapsedtime = elapsedtime.toFixed(2)

			if(time.current){
				time.current.textContent = elapsedtime
			}
		})

		return () => unsubscribeAddEffect()
	}, [])

	return (
		<div className='interface'>
			<div className="time" ref={time}>0:00</div>
			{phase === 'ended' && <div className="restart" onClick={restart}>Restart</div>}
			<div className="controls">
				<div className="raw">
					<div className={`key ${forward ? 'active' : ''}`}></div>
				</div>
				<div className="raw">
					<div className={`key ${leftward ? 'active' : ''}`}></div>
					<div className={`key ${backward ? 'active' : ''}`}></div>
					<div className={`key ${rightward ? 'active' : ''}`}></div>
				</div>
				<div className="raw">
					<div className={`key large ${jump ? 'active' : ''}`}></div>
				</div>
			</div>
		</div>
	)
}

export default Interface