import {
	acceptedKeys,
	fingerings,
	keyMap,
	midiNoteMap,
} from '#app/constants/keys.js'
import { type MetaFunction } from '@remix-run/node'
import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useContext, useEffect, useState } from 'react'
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
import { OrbitControls, OrbitControlsProps } from '@react-three/drei'

export const meta: MetaFunction = () => [{ title: 'Alto Model' }]

interface ControlsProps extends OrbitControlsProps {}

const Controls = ({ ...props }: ControlsProps) => {
	const {
		camera,
		gl: { domElement },
	} = useThree()
	return <OrbitControls {...props} args={[camera, domElement]} />
}

export default function Index() {
	const {
		note,
		setNote,
		setSelectedFingering,
		currentFingerings,
		setCurrentFingerings,
		currentOctave,
	} = useContext(KeyContext)
	const [selectedKey, setSelectedKey] = useState('')
	// default is 48, which is C3 — midi
	const [transpositionPoint, setTranspositionPoint] = useState(46)
	const [currentMidiNote, setCurrentMidiNote] = useState(46)
	// current note layout - based on octave / transposition shift
	const noteLayout = acceptedKeys.map((key, index) => ({
		key,
		midiNote: transpositionPoint + index,
	}))

	const hasAlternateFingerings = currentFingerings.length > 1

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// handle note selection
			if (acceptedKeys.includes(e.key)) {
				// reset fingering index
				setSelectedFingering(0)
				setSelectedKey(e.key)

				const midiNote =
					noteLayout.find((note) => note.key === e.key)?.midiNote || 0
				setCurrentMidiNote(midiNote)

				const parsedNote = keyMap[e.key]!.note
				setNote(parsedNote)

				// set current fingering
				const newCurrentFingerings = fingerings.midiNote[currentMidiNote]
					?.keyIds || [[]]
				setCurrentFingerings(newCurrentFingerings)
			}

			// handle alternate fingering selection
			if (
				!isNaN(Number(e.key)) &&
				hasAlternateFingerings &&
				Number(e.key) < currentFingerings.length
			) {
				setSelectedFingering(Number(e.key))
			}

			// do I want to do this?
			// if (e.key === 'Backspace') {
			// 	setSelectedKey('')
			// 	setNote('')
			// }
		}

		document.addEventListener('keydown', handleKeyDown)
		setSelectedFingering(0)

		// cleanup, cleanup, everybody do your share
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [])

	const handleOctaveChange = (e: KeyboardEvent) => {
		if (e.key === 'z' && transpositionPoint >= 12) {
			setTranspositionPoint(transpositionPoint - 12)
		} else if (e.key === 'x' && transpositionPoint <= 115) {
			setTranspositionPoint(transpositionPoint + 12)
		}
	}

	const handleTranspose = (e: KeyboardEvent) => {
		if (e.key === 'n' && transpositionPoint >= 0) {
			setTranspositionPoint(transpositionPoint - 1)
		} else if (e.key === 'm' && transpositionPoint < 127) {
			setTranspositionPoint(transpositionPoint + 1)
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleOctaveChange)
		document.addEventListener('keydown', handleTranspose)

		return () => {
			document.removeEventListener('keydown', handleOctaveChange)
			document.removeEventListener('keydown', handleTranspose)
		}
	}, [currentOctave, transpositionPoint])

	const mappedNote = `${note} ${currentOctave}`

	const handleSelectFingering = (index: number) => {
		setSelectedFingering(index)
	}

	return (
		<main className="font-poppins mt-2 grid h-full place-items-center">
			<p className="text-center text-lg">play some notes on your keyboard</p>
			<span className="text-center text-3xl">{mappedNote}</span>
			<div className="flex space-x-3">
				{hasAlternateFingerings &&
					currentFingerings.map((fingering: Array<string>, index: number) => (
						<div className="flex flex-col space-y-2 md:w-36">
							<span className="text-center text-xl">{fingering}</span>
							<Button onClick={() => handleSelectFingering(index)}>
								{index}
							</Button>
						</div>
					))}
			</div>
			<Canvas camera={{ position: [0, -2, 11] }} className="h-full w-full">
				<Suspense fallback={null}>
					<spotLight position={[10, 10, 10]} />
					<ambientLight intensity={0.5} />
					<SaxBody position={[0, 0, -1]} />
					<LeftHandMainKeys position={[0, -1, 0]} />
					<RightHandMainKeys position={[0, -5.5, 0]} />
					<RightHandPinkyKeys position={[0, -7.5, 0]} />
					<LeftHandPinkyKeys position={[3, -3.5, 0]} />
					<LeftHandPalmKeys position={[-7, 1, 0]} />
					<RightHandSideKeys position={[-9.5, -4, 0]} />
					<OctaveKey position={[-4, -0.5, 0]} />
					<Controls enableZoom={false} />
				</Suspense>
			</Canvas>
		</main>
	)
}
