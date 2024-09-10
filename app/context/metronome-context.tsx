import React, { createContext, useReducer } from 'react'

export interface MetronomeContextProps {
	state: MetronomeState
	dispatch: React.Dispatch<any>
}

type MetronomeState = {
	bpm: number
	beatsPerMeasure: number
	currentBeat: number
	isPlaying: boolean
	volume: number
}

type ActionProps = {
	type: string
	payload: any
}

function reducer(state: MetronomeState, action: ActionProps) {
	switch (action.type) {
		case 'setBpm':
			return { ...state, bpm: action.payload }
		case 'setBeatsPerMeasure':
			return { ...state, beatsPerMeasure: action.payload }
		case 'setCurrentBeat':
			return { ...state, currentBeat: action.payload }
		case 'setIsPlaying':
			return { ...state, isPlaying: action.payload }
		case 'setVolume':
			return { ...state, volume: action.payload }
		default:
			return state
	}
}

const initialState = {
	bpm: 120,
	beatsPerMeasure: 4,
	currentBeat: 1,
	isPlaying: false,
	volume: 0.5,
}

export const MetronomeContext = createContext<MetronomeContextProps>({
	state: initialState,
	dispatch: () => {},
})

export const MetronomeContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<MetronomeContext.Provider value={{ state, dispatch }}>
			{children}
		</MetronomeContext.Provider>
	)
}
