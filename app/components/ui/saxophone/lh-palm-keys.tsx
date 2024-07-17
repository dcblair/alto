import { Text } from '@react-three/drei'
import { type MeshProps, type GroupProps } from '@react-three/fiber'
import { useContext } from 'react'
import { keyLayout } from '#app/constants/keys.js'
import { KeyContext } from '#app/context/key-context.js'
import { determineIsPressed } from '#app/utils/keys-helpers.ts'

interface LeftHandPalmKeysProps extends GroupProps {
	// isPressed?: boolean;
	// onClick: () => void;
}

interface LeftHandPalmKeyProps extends MeshProps {
	group: string
	keyId: string
	name: string
}

const LeftHandPalmKey = ({
	group,
	keyId,
	name,
	...props
}: LeftHandPalmKeyProps) => {
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

const LeftHandPalmKeys = ({ ...props }: LeftHandPalmKeysProps) => {
	const LeftHandPalmKeys = keyLayout['lh-palm']

	return (
		<>
			{/* d, d#/eb and f left-hand palm keys */}
			{LeftHandPalmKeys &&
				LeftHandPalmKeys.toReversed().map(({ group, keyId, name }) => (
					<group key={keyId} {...props}>
						<LeftHandPalmKey
							position={[
								keyId === 'd-palm' ? 0 : keyId === 'd#/eb-palm' ? 1 : 2,
								keyId === 'd-palm' ? 1.2 : keyId === 'd#/eb-palm' ? 2 : 1,
								0,
							]}
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
					</group>
				))}
		</>
	)
}

export default LeftHandPalmKeys
