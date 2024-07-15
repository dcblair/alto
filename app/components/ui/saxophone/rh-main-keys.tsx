import { Text } from '@react-three/drei'
import { type MeshProps, type GroupProps } from '@react-three/fiber'
import { fingerings, keyLayout } from '#app/constants/keys.js'
import { determineIsPressed } from '#app/utils/keys-helpers.js'

interface RightHandMainKeysProps extends GroupProps {
	// isPressed?: boolean;
	note: string
	octave: number
	// onClick: () => void;
}

interface RightHandMainKeyProps extends MeshProps {
	group: string
	keyId: string
	name: string
	note: string
	octave: number
}

const RightHandMainKey = ({
	group,
	keyId,
	name,
	note,
	octave,
	...props
}: RightHandMainKeyProps) => {
	const currentFingerings = fingerings.octave[octave][note].keyIds

	const isPressed = determineIsPressed(currentFingerings, keyId)

	return (
		<mesh {...props}>
			<circleGeometry args={[0.6, 32]} />
			<meshBasicMaterial color={isPressed ? 'red' : 'gold'} />
		</mesh>
	)
}

const RightHandMainKeys = ({
	note,
	octave,
	...props
}: RightHandMainKeysProps) => {
	// give each key a number and map as pressed or not based on note

	/** todo: consider user being able to press down sax keys manually, too
	 *	eg/ keyboard works as saxophone keys
	 *	eg/ user can click on keys to press them
	 *	eg/ user can press keys on the screen to press them
	 */
	const RightHandMainKeys = keyLayout['rh-main']

	return (
		<group {...props}>
			{/* f, e, d, and f-alt keys */}
			{RightHandMainKeys &&
				RightHandMainKeys.toReversed().map(({ group, keyId, name }, index) => (
					<>
						<RightHandMainKey
							position={[
								keyId === 'f-main-alt' ? -5.5 : 0,
								keyId === 'f-main-alt' ? index + 2 : index,
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
								keyId === 'f-main-alt' ? -9 : -2.5,
								keyId === 'f-main-alt' ? index + 2 : index,
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

export default RightHandMainKeys
