import { acceptedKeys, fingerings, keyMap } from '#app/constants/keys.js'
import { type MetaFunction } from '@remix-run/node'
import { Canvas } from '@react-three/fiber'
import { useContext, useEffect, useState } from 'react'
import LeftHandMainKeys from '#app/components/ui/saxophone/lh-main-keys.js'
import RightHandMainKeys from '#app/components/ui/saxophone/rh-main-keys.js'
import RightHandPinkyKeys from '#app/components/ui/saxophone/rh-pinky-keys.js'
import OctaveKey from '#app/components/ui/saxophone/octave-key.js'
import LeftHandPinkyKeys from '#app/components/ui/saxophone/lh-pinky-keys.js'
import LeftHandPalmKeys from '#app/components/ui/saxophone/lh-palm-keys.js'
import RightHandSideKeys from '#app/components/ui/saxophone/rh-side-keys.js'
import { Button } from '#app/components/ui/button.js'
import { KeyContext } from '#app/context/key-context.js'

export const meta: MetaFunction = () => [{ title: 'Alto Model' }]

export default function Index() {
	const {
		note,
		setNote,
		setSelectedFingering,
		currentOctave,
		setCurrentOctave,
	} = useContext(KeyContext)
	// todo: use midi against this? with octave?
	// alternatively, use midi against note with octave!
	const [selectedKey, setSelectedKey] = useState('')

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (acceptedKeys.includes(e.key)) {
				setSelectedKey(e.key)
				setNote(keyMap[e.key]!.note)
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		// cleanup, cleanup, everybody do your share
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [])

	const handleOctaveChange = (e: KeyboardEvent) => {
		if (e.key === 'z' && currentOctave > 1) {
			setCurrentOctave(currentOctave - 1)
		} else if (e.key === 'x' && currentOctave < 8) {
			setCurrentOctave(currentOctave + 1)
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleOctaveChange)

		return () => document.removeEventListener('keydown', handleOctaveChange)
	}, [currentOctave])

	const mappedNote = `${note} ${currentOctave}`
	const currentFingerings = fingerings.octave[currentOctave][note].keyIds

	const handleSelectFingering = (index: number) => {
		setSelectedFingering(index)
	}

	// todo: handle midi note mapping and enabling of correct fingering selection
	// const midiNote = keyMap[note]!.midiNote

	return (
		<main className="font-poppins grid h-full place-items-center">
			<h1 className="text-center text-4xl font-bold">Welcome to Alto Model!</h1>
			<p className="text-center text-lg">Play some notes on your keyboard!</p>
			<span className="text-center text-3xl">{mappedNote}</span>
			<div className="flex space-x-3">
				{currentFingerings.length > 1 &&
					currentFingerings.map((fingering: Array<number>, index: number) => (
						<div className="flex flex-col space-y-2 md:w-36">
							<span className="text-center text-xl">{fingering}</span>
							<Button onClick={() => handleSelectFingering(index)}>
								{index}
							</Button>
						</div>
					))}
			</div>
			<Canvas camera={{ position: [0, 1, 10] }} className="h-full w-full">
				<spotLight position={[10, 10, 10]} />
				<ambientLight intensity={0.5} />
				<LeftHandMainKeys position={[0, -1, 0]} />
				<RightHandMainKeys position={[0, -5.5, 0]} />
				<RightHandPinkyKeys position={[0, -7.5, 0]} />
				<LeftHandPinkyKeys position={[3, -3.5, 0]} />
				<LeftHandPalmKeys position={[-7, 1, 0]} />
				<RightHandSideKeys position={[-9.5, -4, 0]} />
				<OctaveKey position={[-4, -0.5, 0]} />
			</Canvas>
		</main>
	)
}
