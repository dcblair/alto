import { Text } from '@react-three/drei'
import { type MeshProps, type GroupProps } from '@react-three/fiber'
import { fingerings, keyLayout } from '#app/constants/keys.js'
import { determineIsPressed } from '#app/utils/keys-helpers.ts'

interface LeftHandPalmKeysProps extends GroupProps {
	// isPressed?: boolean;
	note: string
	octave: number
	// onClick: () => void;
}

interface LeftHandPalmKeyProps extends MeshProps {
	group: string
	keyId: string
	name: string
	note: string
	octave: number
}

const LeftHandPalmKey = ({
	group,
	keyId,
	name,
	note,
	octave,
	...props
}: LeftHandPalmKeyProps) => {
	const currentFingerings = fingerings.octave[octave][note].keyIds

	const isPressed = determineIsPressed(currentFingerings, keyId)

	return (
		<mesh {...props}>
			<circleGeometry args={[0.6, 32]} />
			<meshBasicMaterial color={isPressed ? 'red' : 'gold'} />
		</mesh>
	)
}

const LeftHandPalmKeys = ({
	note,
	octave,
	...props
}: LeftHandPalmKeysProps) => {
	const LeftHandPalmKeys = keyLayout['lh-palm']

	return (
		<group {...props}>
			{/* d, d#/eb and f left-hand palm keys */}
			{LeftHandPalmKeys &&
				LeftHandPalmKeys.toReversed().map(({ group, keyId, name }) => (
					<>
						<LeftHandPalmKey
							position={[
								keyId === 'd-palm' ? 0 : keyId === 'd#/eb-palm' ? 1 : 2,
								keyId === 'd-palm' ? 1.2 : keyId === 'd#/eb-palm' ? 2 : 1,
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
							fontSize={0.4}
							position={[
								keyId === 'd-palm' ? -4 : keyId === 'd#/eb-palm' ? -2.5 : -1.7,
								keyId === 'd-palm' ? 1.2 : keyId === 'd#/eb-palm' ? 2 : 1,
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

export default LeftHandPalmKeys
