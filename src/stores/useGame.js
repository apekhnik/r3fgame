import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) => {
	return {
		blockCount: 3,
		blockSeed: 0,
		phase: 'ready',

		startTime: 0,
		endTime: 0,

		currentLevel: 1,

		start: () => {
			set((state) => {
				if(state.phase === 'ready') return { 
					phase: 'playing', 
					startTime: Date.now() 
				}
				return {}
			})
		},
		restart: () => {
			set((state) => {
				if(state.phase === 'playing' || state.phase === 'ended') return { phase: 'ready', 
				blockSeed: Math.random()
				}
				return {}
			})
		},
		end: () => {
			set((state) => {
				if(state.phase === 'playing') return {
					 phase: 'ended',
					 endTime: Date.now() 
					}
				return {}
			})
		},

		nextLevel: () => {
			set((state) => {
				if(state.phase === 'ended') return {
					currentLevel: state.currentLevel + 1,
				}
				return {}
			})
		},
		prevLevel: () => {
			set((state) => {
				if(state.phase === 'ended' && state.currentLevel >= 2) return {
					currentLevel: state.currentLevel - 1,
				}

				return {}
			})
		}
	}
}))