import { acceptedKeys, keyMap } from '#app/constants/keys.js'
import { type MetaFunction } from '@remix-run/node'
import { Canvas, MeshProps } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Mesh } from 'three'
// import SaxKey from '#app/components/ui/saxophone/front-key.js'

export const meta: MetaFunction = () => [{ title: 'Alto Model' }]

interface SaxKeyProps extends MeshProps {
	hasKeyPearl?: boolean
	// isPressed?: boolean;
	keyId: number
	note: (typeof acceptedKeys)[number] | null
	// onClick: () => void;
}

const FrontSaxKey = ({
	note,
	hasKeyPearl = false,
	keyId,
	...props
}: SaxKeyProps) => {
	const meshRef = useRef() as React.MutableRefObject<Mesh>
	// give each key a number and map as pressed or not based on note

	/** todo: consider user being able to press down sax keys manually, too
	 *	eg/ keyboard works as saxophone keys
	 *	eg/ user can click on keys to press them
	 *	eg/ user can press keys on the screen to press them
	 */
	const isPressed =
		(note === 'a' && (keyId === 1 || keyId === 3)) ||
		(note === 's' && keyId === 1)
			? true
			: false

	return (
		<mesh ref={meshRef} {...props}>
			<circleGeometry args={[1, 32]} />
			<meshBasicMaterial color={isPressed ? 'red' : 'white'} />
		</mesh>
	)
}

export default function Index() {
	const [note, setNote] = useState<string | null>(null)
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

	const mappedNote = note && `${keyMap[note]} ${currentOctave}`
	return (
		<main className="font-poppins grid h-full place-items-center">
			<h1 className="text-center text-4xl font-bold">Welcome to Alto Model!</h1>
			<p className="text-center text-lg">Play some notes on your keyboard!</p>
			<span className="text-center text-3xl">
				{/* {note} */}
				{mappedNote}
			</span>
			<Canvas className="w-96">
				<spotLight position={[10, 10, 10]} />
				<ambientLight intensity={0.5} />
				{Array.from(Array(10).keys()).map((_, i) => (
					<FrontSaxKey note={note} keyId={i} key={i} position={[0, i - 1, 0]} />
				))}
			</Canvas>
		</main>
	)
}
