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
	const currentFingerings = fingerings.octave[octave][note].keyIds

	const isArrayNested = currentFingerings.some((innerArray: []) =>
		Array.isArray(innerArray),
	)

	const isPressed = isArrayNested
		? currentFingerings[0].some((fingering: any) => fingering === keyId)
		: currentFingerings.some((selectedKeyId: number) => selectedKeyId === keyId)

	const isForkOrBis = name === 'fork f' || name === 'bis b'

	return (
		<mesh {...props}>
			<circleGeometry args={[isForkOrBis ? 0.45 : 0.6, 32]} />
			<meshBasicMaterial color={isPressed ? 'red' : 'gold'} />
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
	const leftHandMainKeys = keyLayout['lh-main']
	// todo: handle positioning based on keyId
	return (
		<group {...props}>
			{/* fork f, b, bis b, c, and g keys */}
			{leftHandMainKeys &&
				leftHandMainKeys.map(({ group, keyId, name }) => (
					<LeftHandMainKey
						position={[0, keyId - 2, 0]}
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
