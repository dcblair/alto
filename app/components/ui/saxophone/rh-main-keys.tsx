import { Text } from '@react-three/drei'
import { type MeshProps, type GroupProps } from '@react-three/fiber'
import { useContext } from 'react'
import { keyLayout } from '#app/constants/keys.js'
import { KeyContext } from '#app/context/key-context.js'
import { determineIsPressed } from '#app/utils/keys-helpers.js'

interface RightHandMainKeysProps extends GroupProps {
	// isPressed?: boolean;
	// onClick: () => void;
}

interface RightHandMainKeyProps extends MeshProps {
	group: string
	keyId: string
	name: string
}

const RightHandMainKey = ({
	group,
	keyId,
	name,
	...props
}: RightHandMainKeyProps) => {
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

const RightHandMainKeys = ({ ...props }: RightHandMainKeysProps) => {
	// give each key a number and map as pressed or not based on note

	/** todo: consider user being able to press down sax keys manually, too
	 *	eg/ keyboard works as saxophone keys
	 *	eg/ user can click on keys to press them
	 *	eg/ user can press keys on the screen to press them
	 */
	const RightHandMainKeys = keyLayout['rh-main']

	return (
		<>
			{/* f, e, d, and f-alt keys */}
			{RightHandMainKeys &&
				RightHandMainKeys.toReversed().map(({ group, keyId, name }, index) => (
					<group key={keyId} {...props}>
						<RightHandMainKey
							position={[
								keyId === 'f-main-alt' ? -3.5 : 0,
								keyId === 'f-main-alt' ? index + 2 : index,
								0,
							]}
							key={keyId}
							group={group}
							keyId={keyId}
							name={name}
						/>
						<Text
							fontSize={0.4}
							position={[
								keyId === 'f-main-alt' ? -5.5 : -2,
								keyId === 'f-main-alt' ? index + 2 : index,
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

export default RightHandMainKeys
