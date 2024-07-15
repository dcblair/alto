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
	currentOctave: number
	setCurrentOctave: (octave: number) => void
	selectedFingering: number[]
	setSelectedFingering: (fingering: number[]) => void
}

export const KeyContext = createContext({
	note: 'a',
	setNote: (_value: string) => {},
	// come back and fix this
	midiNote: 56,
	setMidiNote: (_value: number) => {},
	currentOctave: 3,
	setCurrentOctave: (_value: number) => {},
	selectedFingering: 0,
	setSelectedFingering: (_value: number) => {},
})

export const KeyContextProvider = ({ children }: { children: ReactNode }) => {
	const [note, setNote] = useState('a')
	const [midiNote, setMidiNote] = useState<number>(56)
	const [currentOctave, setCurrentOctave] = useState<number>(3)
	const [selectedFingering, setSelectedFingering] = useState<number>(0)

	return (
		<KeyContext.Provider
			value={{
				note,
				setNote,
				midiNote,
				setMidiNote,
				currentOctave,
				setCurrentOctave,
				selectedFingering,
				setSelectedFingering,
			}}
		>
			{children}
		</KeyContext.Provider>
	)
}
