import { Text } from '@react-three/drei'
import { type MeshProps, type GroupProps } from '@react-three/fiber'
import { fingerings, keyLayout } from '#app/constants/keys.js'
import { determineIsPressed } from '#app/utils/keys-helpers.js'

interface LeftHandPinkyKeysProps extends GroupProps {
	// isPressed?: boolean;
	note: string
	octave: number
	// onClick: () => void;
}

interface LeftHandPinkyKeyProps extends MeshProps {
	group: string
	keyId: string
	name: string
	note: string
	octave: number
}

const LeftHandPinkyKey = ({
	group,
	keyId,
	name,
	note,
	octave,
	...props
}: LeftHandPinkyKeyProps) => {
	const currentFingerings = fingerings.octave[octave][note].keyIds

	const isPressed = determineIsPressed(currentFingerings, keyId)

	return (
		<mesh {...props}>
			<circleGeometry args={[0.6, 32]} />
			<meshBasicMaterial color={isPressed ? 'red' : 'gold'} />
		</mesh>
	)
}

const LeftHandPinkyKeys = ({
	note,
	octave,
	...props
}: LeftHandPinkyKeysProps) => {
	const LeftHandPinkyKeys = keyLayout['lh-pinky']

	return (
		<group {...props}>
			{/* g#/ab, c#/db, b, and a#/bb left-hand pinky keys */}
			{LeftHandPinkyKeys &&
				LeftHandPinkyKeys.toReversed().map(({ group, keyId, name }) => (
					<>
						<LeftHandPinkyKey
							position={[
								keyId === 'b-pinky' ? 1 : keyId === 'c#/db-pinky' ? -1 : 0,
								keyId === 'g#/ab-pinky'
									? 1.2
									: keyId === 'a#/bb-pinky-left'
										? -1.2
										: 0,
								0,
							]}
							octave={octave}
							key={keyId}
							note={note}
							group={group}
							name={name}
							keyId={keyId}
						/>
						<Text
							position={[
								keyId === 'b-pinky' ? 5 : keyId === 'c#/db-pinky' ? 10 : 7,
								keyId === 'g#/ab-pinky'
									? 1.2
									: keyId === 'a#/bb-pinky-left'
										? -1.2
										: 0,
								0,
							]}
						>
							{keyId}
						</Text>
					</>
				))}
		</group>
	)
}

export default LeftHandPinkyKeys
