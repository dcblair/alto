import { acceptedKeys, fingerings, keyMap } from '#app/constants/keys.js'
import { type MetaFunction } from '@remix-run/node'
import { Canvas, useThree } from '@react-three/fiber'
import {
	Suspense,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
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
import { cn } from '#app/utils/misc.js'

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
	const audioPlaybackRef = useRef(null)
	const [selectedKey, setSelectedKey] = useState('')

	const currentKeyLayout = useMemo(() => {
		return acceptedKeys.map((key, index) => ({
			key,
			midiNote: transpositionPoint + index,
		}))
	}, [transpositionPoint])

	const hasAlternateFingerings = currentFingerings.length > 1

	useEffect(() => {
		// set fingerings of currently selected note
		const newCurrentFingerings = fingerings.midiNote[currentMidiNote]
			?.keyIds || [[]]
		dispatch({
			type: 'setCurrentFingerings',
			payload: newCurrentFingerings,
		})
	}, [currentMidiNote, dispatch])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// handle note selection
			if (acceptedKeys.includes(e.key)) {
				// reset fingering index
				dispatch({ type: 'setSelectedFingering', payload: 0 })
				setSelectedKey(e.key)

				// set current midi note
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
		document.addEventListener('keydown', handlePlaybackNote)

		// cleanup, cleanup, everybody do your share
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('keydown', handlePlaybackNote)
		}
	}, [
		currentKeyLayout,
		currentFingerings,
		keyMap,
		currentMidiNote,
		dispatch,
		selectedKey,
		transpositionPoint,
		note,
	])

	// todo: replace audio files in public/samples/saxophone with actual saxophone samples
	const handlePlaybackNote = () => {
		if (audioPlaybackRef?.current) {
			const audioElement = audioPlaybackRef.current as HTMLAudioElement
			try {
				if (audioElement.paused) audioElement.play()
			} catch (error) {
				console.error(error)
			}
		}
	}

	const handleOctaveChange = (e: KeyboardEvent) => {
		if (e.key === 'z' && transpositionPoint >= 12) {
			dispatch({ type: 'setSelectedFingering', payload: 0 })
			dispatch({ type: 'octaveDown' })
		} else if (e.key === 'x' && transpositionPoint <= 115) {
			dispatch({ type: 'setSelectedFingering', payload: 0 })
			dispatch({ type: 'octaveUp' })
		}
	}

	const handleTranspose = (e: KeyboardEvent) => {
		if (e.key === 'n' && transpositionPoint >= 0) {
			dispatch({ type: 'setSelectedFingering', payload: 0 })
			dispatch({ type: 'transposeDown' })
		} else if (e.key === 'm' && transpositionPoint < 127) {
			dispatch({ type: 'setSelectedFingering', payload: 0 })
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
	}, [dispatch, transpositionPoint])

	const handleSelectFingering = (index: number) => {
		dispatch({ type: 'setSelectedFingering', payload: index })
	}

	const currentOctave = fingerings.midiNote[currentMidiNote]?.octave ?? ''
	const noteWithOctave = `${note}${currentOctave}`

	const controlsEnabled = true

	return (
		<main className="font-poppins mt-2 grid h-full place-items-center">
			{/* directions and note info */}
			<div className="mb-8 flex flex-col text-center">
				<p className="text-center text-lg">play some notes on your keyboard</p>
				<span className="text-center text-3xl">
					{noteWithOctave} - {currentMidiNote}
				</span>
			</div>

			{/* fingerings buttons */}
			<div className="flex h-8 space-x-3">
				{hasAlternateFingerings &&
					currentFingerings.map((fingering: Array<string>, index: number) => {
						return (
							<div className="flex flex-col space-y-2 md:w-36" key={index}>
								<span className="text-center text-xs">{fingering}</span>
								<Button
									className={cn(
										index === selectedFingering
											? 'border-2 border-slate-100 bg-slate-700 text-white transition-all duration-75 ease-in-out'
											: '',
									)}
									onClick={() => handleSelectFingering(index)}
								>
									{index + 1}
								</Button>
							</div>
						)
					})}
			</div>

			{/* three.js canvas and models */}
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

			{/* audio controls */}
			<div className="flex">
				<audio
					controls
					autoPlay
					ref={audioPlaybackRef}
					src={`/samples/saxophone/${currentMidiNote}_${selectedFingering}.wav`}
				></audio>
			</div>
		</main>
	)
}
