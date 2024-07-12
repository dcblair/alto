import { Text } from '@react-three/drei'
import { type MeshProps, type GroupProps } from '@react-three/fiber'
import { fingerings, keyLayout } from '#app/constants/keys.js'

interface RightHandPinkyKeysProps extends GroupProps {
	// isPressed?: boolean;
	note: string
	octave: number
	// onClick: () => void;
}

interface RightHandPinkyKeyProps extends MeshProps {
	group: string
	keyId: string
	name: string
	note: string
	octave: number
}

const RightHandPinkyKey = ({
	group,
	keyId,
	name,
	note,
	octave,
	...props
}: RightHandPinkyKeyProps) => {
	const currentFingerings = fingerings.octave[octave][note].keyIds

	const isArrayNested = currentFingerings.some((innerArray: []) =>
		Array.isArray(innerArray),
	)

	const isPressed = isArrayNested
		? currentFingerings[0].some((fingering: any) => fingering === keyId)
		: currentFingerings.some((selectedKeyId: string) => selectedKeyId === keyId)

	return (
		<mesh {...props}>
			<circleGeometry args={[0.6, 32]} />
			<meshBasicMaterial color={isPressed ? 'red' : 'gold'} />
		</mesh>
	)
}

const RightHandPinkyKeys = ({
	note,
	octave,
	...props
}: RightHandPinkyKeysProps) => {
	// give each key a number and map as pressed or not based on note

	/** todo: consider user being able to press down sax keys manually, too
	 *	eg/ keyboard works as saxophone keys
	 *	eg/ user can click on keys to press them
	 *	eg/ user can press keys on the screen to press them
	 */
	const RightHandPinkyKeys = keyLayout['rh-pinky']

	return (
		<group {...props}>
			{/* fork f, b, bis b, c, and g keys */}
			{RightHandPinkyKeys &&
				RightHandPinkyKeys.toReversed().map(({ group, keyId, name }, index) => (
					<>
						<RightHandPinkyKey
							position={[0, index, 0]}
							octave={octave}
							key={keyId}
							note={note}
							group={group}
							name={name}
							keyId={keyId}
						/>
						<Text position={[-3, index, 0]}>{keyId}</Text>
					</>
				))}
		</group>
	)
}

export default RightHandPinkyKeys
