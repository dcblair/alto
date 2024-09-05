import { createContext, type ReactNode, useReducer } from 'react'

/**
 * do i want to include the key name and color here?
 * or should i just include the keyId and determine the name and color in the component?
 */

export interface KeyContextProps {
	state: ReducerStateProps
	dispatch: React.Dispatch<any>
}

interface ReducerStateProps {
	note: string
	currentMidiNote: number
	transpositionPoint: number
	currentFingerings: string[][]
	selectedFingering: number
}

interface ActionProps {
	type:
		| 'octaveDown'
		| 'octaveUp'
		| 'setCurrentFingerings'
		| 'setCurrentMidiNote'
		| 'setNote'
		| 'setSelectedFingering'
		| 'transposeDown'
		| 'transposeUp'
	payload: any
}

function reducer(state: ReducerStateProps, action: ActionProps) {
	switch (action.type) {
		case 'octaveDown':
			return {
				...state,
				currentMidiNote: state.currentMidiNote - 12,
				selectedFingering: 0,
				transpositionPoint: state.transpositionPoint - 12,
			}
		case 'octaveUp':
			return {
				...state,
				currentMidiNote: state.currentMidiNote + 12,
				selectedFingering: 0,
				transpositionPoint: state.transpositionPoint + 12,
			}
		case 'setCurrentFingerings':
			return {
				...state,
				currentFingerings: action.payload,
			}
		case 'setCurrentMidiNote':
			return {
				...state,
				currentMidiNote: action.payload,
			}
		case 'setNote':
			return {
				...state,
				note: action.payload,
			}
		case 'setSelectedFingering':
			return {
				...state,
				selectedFingering: action.payload,
			}
		case 'transposeDown':
			return {
				...state,
				currentMidiNote: state.currentMidiNote - 1,
				selectedFingering: 0,
				transpositioinPoint: state.transpositionPoint - 1,
			}
		case 'transposeUp':
			return {
				...state,
				currentMidiNote: state.currentMidiNote + 1,
				selectedFingering: 0,
				transpositioinPoint: state.transpositionPoint + 1,
			}
		default:
			return state
	}
}

const initialState = {
	note: 'c',
	currentMidiNote: 48,
	transpositionPoint: 48,
	currentFingerings: [
		[
			'b-main',
			'c-main',
			'g-main',
			'f-main',
			'e-main',
			'd-main',
			'a#/bb-pinky-right',
		],
	],
	selectedFingering: 0,
}

export const KeyContext = createContext<KeyContextProps>({
	state: initialState,
	dispatch: () => {},
})

export const KeyContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<KeyContext.Provider value={{ state, dispatch }}>
			{children}
		</KeyContext.Provider>
	)
}
