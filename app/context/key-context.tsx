import { createContext, type ReactNode, useState } from 'react'

/**
 * do i want to include the key name and color here?
 * or should i just include the keyId and determine the name and color in the component?
 */

export interface KeyContextProps {
	note: string
	setNote: (note: string) => void
	midiNote: number
	setMidiNote: (midiNote: number) => void
	currentFingerings: number[]
	setCurrentFingerings: (fingering: string[]) => void
	selectedFingering: number
	setSelectedFingering: (fingering: number) => void
}

export const KeyContext = createContext({
	note: 'c',
	setNote: (_value: string) => {},
	// come back and fix this
	midiNote: 48,
	setMidiNote: (_value: number) => {},
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
	setCurrentFingerings: (_value: Array<string[]>) => {},
	selectedFingering: 0,
	setSelectedFingering: (_value: number) => {},
})

export const KeyContextProvider = ({ children }: { children: ReactNode }) => {
	const [note, setNote] = useState('c')
	const [midiNote, setMidiNote] = useState<number>(56)
	const [currentFingerings, setCurrentFingerings] = useState<Array<string[]>>([
		[
			'b-main',
			'c-main',
			'g-main',
			'f-main',
			'e-main',
			'd-main',
			'a#/bb-pinky-right',
		],
	])
	const [selectedFingering, setSelectedFingering] = useState<number>(0)

	return (
		<KeyContext.Provider
			value={{
				note,
				setNote,
				midiNote,
				setMidiNote,
				currentFingerings,
				setCurrentFingerings,
				selectedFingering,
				setSelectedFingering,
			}}
		>
			{children}
		</KeyContext.Provider>
	)
}
