import { Text } from '@react-three/drei'
import { type MeshProps, type GroupProps } from '@react-three/fiber'
import { useContext } from 'react'
import { keyLayout } from '#app/constants/keys.js'
import { KeyContext } from '#app/context/key-context.js'
import { determineIsPressed } from '#app/utils/keys-helpers.js'

interface LeftHandPinkyKeysProps extends GroupProps {
	// isPressed?: boolean;
	// onClick: () => void;
}

interface LeftHandPinkyKeyProps extends MeshProps {
	group: string
	keyId: string
	name: string
}

const LeftHandPinkyKey = ({
	group,
	keyId,
	name,
	...props
}: LeftHandPinkyKeyProps) => {
	const {
		state: { currentFingerings, selectedFingering },
	} = useContext(KeyContext)

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

const LeftHandPinkyKeys = ({ ...props }: LeftHandPinkyKeysProps) => {
	const LeftHandPinkyKeys = keyLayout['lh-pinky']

	return (
		<>
			{/* g#/ab, c#/db, b, and a#/bb left-hand pinky keys */}
			{LeftHandPinkyKeys &&
				LeftHandPinkyKeys.toReversed().map(({ group, keyId, name }) => (
					<group key={keyId} {...props}>
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
							group={group}
							name={name}
							keyId={keyId}
						/>
						<Text
							fontSize={0.4}
							position={[
								keyId === 'b-pinky' ? 3.5 : keyId === 'c#/db-pinky' ? 6 : 4.5,
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
					</group>
				))}
		</>
	)
}

export default LeftHandPinkyKeys
