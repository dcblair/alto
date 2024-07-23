import {
	acceptedKeys,
	fingerings,
	keyMap,
	midiNoteMap,
} from '#app/constants/keys.js'
import { type MetaFunction } from '@remix-run/node'
import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useContext, useEffect, useReducer, useState } from 'react'
import LeftHandMainKeys from '#app/components/ui/saxophone/lh-main-keys.js'
import RightHandMainKeys from '#app/components/ui/saxophone/rh-main-keys.js'
import RightHandPinkyKeys from '#app/components/ui/saxophone/rh-pinky-keys.js'
import OctaveKey from '#app/components/ui/saxophone/octave-key.js'
import LeftHandPinkyKeys from '#app/components/ui/saxophone/lh-pinky-keys.js'
import LeftHandPalmKeys from '#app/components/ui/saxophone/lh-palm-keys.js'
import RightHandSideKeys from '#app/components/ui/saxophone/rh-side-keys.js'
import { Button } from '#app/components/ui/button.js'
import { KeyContext } from '#app/context/key-context.js'
import SaxBody from '#app/components/ui/saxophone/sax-body.js'
import { OrbitControls, type OrbitControlsProps } from '@react-three/drei'

export const meta: MetaFunction = () => [{ title: 'Alto Model' }]

interface ControlsProps extends OrbitControlsProps {}

const Controls = ({ ...props }: ControlsProps) => {
	const {
		camera,
		gl: { domElement },
	} = useThree()
	return <OrbitControls args={[camera, domElement]} {...props} />
}

export default function Index() {
	const {
		state: {
			currentFingerings,
			currentMidiNote,
			note,
			selectedFingering,
			transpositionPoint,
		},
		dispatch,
	} = useContext(KeyContext)
	const [selectedKey, setSelectedKey] = useState('')
	// default is 48, which is C3 — midi
	const [currentKeyLayout, setCurrentKeyLayout] = useState(
		acceptedKeys.map((key, index) => ({
			key,
			midiNote: transpositionPoint + index,
		})),
	)

	const hasAlternateFingerings = currentFingerings.length > 1

	useEffect(() => {
		// current note layout - based on octave / transposition shift
		const noteLayout = acceptedKeys.map((key, index) => ({
			key,
			midiNote: transpositionPoint + index,
		}))
		setCurrentKeyLayout(noteLayout)
	}, [transpositionPoint])

	// set fingerings of currently selected note
	useEffect(() => {
		const newCurrentFingerings = fingerings.midiNote[currentMidiNote]
			?.keyIds || [[]]
		dispatch({ type: 'setCurrentFingerings', payload: newCurrentFingerings })
	}, [currentMidiNote])

	// issue useeffect is decoupled from handleoctave change and transpose, so the midi note is not updating
	// need to fix this
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// handle note selection
			if (acceptedKeys.includes(e.key)) {
				// reset fingering index
				dispatch({ type: 'setSelectedFingering', payload: 0 })
				setSelectedKey(e.key)

				const midiNote =
					currentKeyLayout.find((note) => note.key === e.key)?.midiNote || 0

				dispatch({ type: 'setCurrentMidiNote', payload: midiNote })

				const parsedNote = keyMap[e.key]!.note
				dispatch({ type: 'setNote', payload: parsedNote })
			}

			// handle alternate fingering selection
			if (
				!isNaN(Number(e.key)) &&
				hasAlternateFingerings &&
				Number(e.key) < currentFingerings.length
			) {
				dispatch({ type: 'setSelectedFingering', payload: Number(e.key) })
			}

			// do I want to do this?
			// if (e.key === 'Backspace') {
			// 	setSelectedKey('')
			// 	setNote('')
			// }
		}

		document.addEventListener('keydown', handleKeyDown)

		// cleanup, cleanup, everybody do your share
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [])

	const handleOctaveChange = (e: KeyboardEvent) => {
		if (e.key === 'z' && transpositionPoint >= 12) {
			dispatch({ type: 'octaveDown' })
		} else if (e.key === 'x' && transpositionPoint <= 115) {
			dispatch({ type: 'octaveUp' })
		}
	}

	const handleTranspose = (e: KeyboardEvent) => {
		if (e.key === 'n' && transpositionPoint >= 0) {
			dispatch({ type: 'transposeDown' })
		} else if (e.key === 'm' && transpositionPoint < 127) {
			dispatch({ type: 'transposeUp' })
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleOctaveChange)
		document.addEventListener('keydown', handleTranspose)

		return () => {
			document.removeEventListener('keydown', handleOctaveChange)
			document.removeEventListener('keydown', handleTranspose)
		}
	}, [transpositionPoint])

	const handleSelectFingering = (index: number) => {
		dispatch({ type: 'setSelectedFingering', payload: index })
	}

	const currentOctave = fingerings.midiNote[currentMidiNote]?.octave ?? ''
	const noteWithOctave = `${note}${currentOctave}`

	const controlsEnabled = true

	return (
		<main className="font-poppins mt-2 grid h-full place-items-center">
			<p className="text-center text-lg">play some notes on your keyboard</p>
			<span className="text-center text-3xl">
				{noteWithOctave} - {currentMidiNote}
			</span>

			<div className="flex space-x-3">
				{hasAlternateFingerings &&
					currentFingerings.map((fingering: Array<string>, index: number) => (
						<div className="flex flex-col space-y-2 md:w-36" key={index}>
							<span className="text-center text-xs">{fingering}</span>
							<Button onClick={() => handleSelectFingering(index)}>
								{index}
							</Button>
						</div>
					))}
			</div>
			<div className="relative h-[600px] w-full">
				<Canvas
					camera={{ fov: 70, position: [0, 0, 13] }}
					resize={{ scroll: false }}
					gl={{ antialias: true }}
				>
					<Suspense fallback={null}>
						<spotLight position={[10, 10, 10]} />
						<ambientLight intensity={0.5} />
						<SaxBody position={[0, 2, -1]} />
						<LeftHandMainKeys position={[0, 2, 0]} />
						<RightHandMainKeys position={[0, -2.6, 0]} />
						<RightHandPinkyKeys position={[0, -4, 0]} />
						<LeftHandPinkyKeys position={[3, 1.5, 0]} />
						<LeftHandPalmKeys position={[2, 3.7, 0]} />
						<RightHandSideKeys position={[-7.5, -2, 0]} />
						<OctaveKey position={[-4, 2.5, 0]} />
						{controlsEnabled ? <Controls enableZoom={false} /> : null}
					</Suspense>
				</Canvas>
			</div>
		</main>
	)
}
