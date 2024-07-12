import { type MeshProps, type GroupProps } from '@react-three/fiber'
import { fingerings, keyLayout } from '#app/constants/keys.js'

interface LeftHandMainKeysProps extends GroupProps {
	// isPressed?: boolean;
	note: string
	octave: number
	// onClick: () => void;
}

interface LeftHandMainKeyProps extends MeshProps {
	group: string
	note: string
	name: string
	octave: number
	keyId: number
}

const LeftHandMainKey = ({
	group,
	keyId,
	name,
	note,
	octave,
	...props
}: LeftHandMainKeyProps) => {
	console.log(note, octave, fingerings.octave[octave][note])
	const currentFingerings = fingerings.octave[octave][note].keyIds
	const isPressed =
		currentFingerings.length > 1
			? currentFingerings.find(
					(selectedKeyId: number) => selectedKeyId === keyId,
				)
			: currentFingerings.find((currentFingering: Array<number>) =>
					currentFingering.find((fingering) => fingering === keyId),
				)

	console.log(isPressed)
	return (
		<mesh {...props}>
			<circleGeometry args={[1, 32]} />
			<meshBasicMaterial color={isPressed ? 'red' : 'white'} />
		</mesh>
	)
}

const LeftHandMainKeys = ({
	note,
	octave,
	...props
}: LeftHandMainKeysProps) => {
	// give each key a number and map as pressed or not based on note

	/** todo: consider user being able to press down sax keys manually, too
	 *	eg/ keyboard works as saxophone keys
	 *	eg/ user can click on keys to press them
	 *	eg/ user can press keys on the screen to press them
	 */
	// const isPressed = note === 'a' && (keyId === 1 || keyId === 3) ? true : false
	const leftHandMainKeys = keyLayout['lh-main']

	return (
		<group {...props}>
			{/* fork f, b, bis b, c, and g keys */}
			{leftHandMainKeys &&
				leftHandMainKeys.map(({ group, keyId, name }) => (
					<LeftHandMainKey
						position={[0, keyId, 0]}
						octave={octave}
						key={keyId}
						note={note}
						group={group}
						name={name}
						keyId={keyId}
					/>
				))}
		</group>
	)
}

export default LeftHandMainKeys
