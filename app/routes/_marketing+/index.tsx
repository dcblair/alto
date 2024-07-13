import { acceptedKeys, keyMap } from '#app/constants/keys.js'
import { type MetaFunction } from '@remix-run/node'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import LeftHandMainKeys from '#app/components/ui/saxophone/lh-main-keys.js'
import RightHandMainKeys from '#app/components/ui/saxophone/rh-main-keys.js'
import RightHandPinkyKeys from '#app/components/ui/saxophone/rh-pinky-keys.js'
import OctaveKey from '#app/components/ui/saxophone/octave-key.js'

export const meta: MetaFunction = () => [{ title: 'Alto Model' }]

export default function Index() {
	const [note, setNote] = useState<string>('a')
	const [currentOctave, setCurrentOctave] = useState<number>(3)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (acceptedKeys.includes(e.key)) {
				setNote(e.key)
				console.log(e.key, note)
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

	const parsedNote = keyMap[note]!.note
	const mappedNote = `${parsedNote} ${currentOctave}`

	return (
		<main className="font-poppins grid h-full place-items-center">
			<h1 className="text-center text-4xl font-bold">Welcome to Alto Model!</h1>
			<p className="text-center text-lg">Play some notes on your keyboard!</p>
			<span className="text-center text-3xl">
				{/* {note} */}
				{mappedNote}
			</span>
			<Canvas camera={{ position: [0, 1, 10] }} className="h-full w-full">
				<spotLight position={[10, 10, 10]} />
				<ambientLight intensity={0.5} />
				<LeftHandMainKeys
					note={parsedNote}
					octave={currentOctave}
					position={[0, -1, 0]}
				/>
				<RightHandMainKeys
					note={parsedNote}
					octave={currentOctave}
					position={[0, -5.5, 0]}
				/>
				<RightHandPinkyKeys
					note={parsedNote}
					octave={currentOctave}
					position={[0, -7.5, 0]}
				/>
				<OctaveKey
					note={parsedNote}
					octave={currentOctave}
					position={[-4.5, -0.5, 0]}
				/>
			</Canvas>
		</main>
	)
}
