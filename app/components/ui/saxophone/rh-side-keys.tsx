import { Text } from '@react-three/drei'
import { type MeshProps, type GroupProps } from '@react-three/fiber'
import { useContext } from 'react'
import { keyLayout } from '#app/constants/keys.js'
import { KeyContext } from '#app/context/key-context.js'
import { determineIsPressed } from '#app/utils/keys-helpers.ts'

interface RightHandSideKeysProps extends GroupProps {
	// isPressed?: boolean;
	// onClick: () => void;
}

interface RightHandSideKeyProps extends MeshProps {
	group: string
	keyId: string
	name: string
}

const RightHandSideKey = ({
	group,
	keyId,
	name,
	...props
}: RightHandSideKeyProps) => {
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

const RightHandSideKeys = ({ ...props }: RightHandSideKeysProps) => {
	const RightHandSideKeys = keyLayout['rh-side']

	return (
		<>
			{/* e, c and a#/bb right-hand side keys */}
			{RightHandSideKeys &&
				RightHandSideKeys.toReversed().map(({ group, keyId, name }, index) => (
					<group key={keyId} {...props}>
						<RightHandSideKey
							position={[0, index, 0]}
							key={keyId}
							group={group}
							name={name}
							keyId={keyId}
						/>
						<Text fontSize={0.4} position={[-2, index, 0]}>
							{keyId}
						</Text>
					</group>
				))}
		</>
	)
}

export default RightHandSideKeys
