import { Text } from '@react-three/drei'
import { type MeshProps, type GroupProps } from '@react-three/fiber'
import { useContext } from 'react'
import { keyLayout } from '#app/constants/keys.js'
import { KeyContext } from '#app/context/key-context.js'
import { determineIsPressed } from '#app/utils/keys-helpers.js'

interface RightHandPinkyKeysProps extends GroupProps {
	// isPressed?: boolean;
	// onClick: () => void;
}

interface RightHandPinkyKeyProps extends MeshProps {
	group: string
	keyId: string
	name: string
}

const RightHandPinkyKey = ({
	group,
	keyId,
	name,
	...props
}: RightHandPinkyKeyProps) => {
	const { currentFingerings, selectedFingering } = useContext(KeyContext)

	const isPressed = determineIsPressed(
		currentFingerings,
		keyId,
		selectedFingering,
	)

	return (
		<mesh {...props}>
			<circleGeometry args={[0.6, 32]} />
			<meshBasicMaterial color={isPressed ? 'red' : 'gold'} />
		</mesh>
	)
}

const RightHandPinkyKeys = ({ ...props }: RightHandPinkyKeysProps) => {
	const RightHandPinkyKeys = keyLayout['rh-pinky']

	return (
		<group {...props}>
			{/* d#/eb and a#/bb right-hand pinky keys */}
			{RightHandPinkyKeys &&
				RightHandPinkyKeys.toReversed().map(({ group, keyId, name }, index) => (
					<group key={keyId}>
						<RightHandPinkyKey
							position={[0, index, 0]}
							group={group}
							name={name}
							keyId={keyId}
						/>
						<Text fontSize={0.4} position={[-2.7, index, 0]}>
							{keyId}
						</Text>
					</group>
				))}
		</group>
	)
}

export default RightHandPinkyKeys
