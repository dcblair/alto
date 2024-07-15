import { Text } from '@react-three/drei'
import { type MeshProps, type GroupProps } from '@react-three/fiber'
import { useContext } from 'react'
import { fingerings, keyLayout } from '#app/constants/keys.js'
import { KeyContext } from '#app/context/key-context.js'
import { determineIsPressed } from '#app/utils/keys-helpers.js'

interface LeftHandMainKeysProps extends GroupProps {
	// onClick: () => void;
}

interface LeftHandMainKeyProps extends MeshProps {
	group: string
	keyId: string
	name: string
}

const LeftHandMainKey = ({
	group,
	keyId,
	name,
	...props
}: LeftHandMainKeyProps) => {
	const { note, currentOctave } = useContext(KeyContext)
	const currentFingerings = fingerings.octave[currentOctave][note].keyIds

	console.log(currentFingerings)
	const isPressed = determineIsPressed(currentFingerings, keyId)

	const isForkOrBis = keyId === 'f-fork' || keyId === 'b-bis'
	return (
		<mesh {...props}>
			<circleGeometry args={[isForkOrBis ? 0.45 : 0.6, 32]} />
			<meshBasicMaterial color={isPressed ? 'red' : 'gold'} />
		</mesh>
	)
}

const LeftHandMainKeys = ({ ...props }: LeftHandMainKeysProps) => {
	// give each key a number and map as pressed or not based on note

	/** todo: consider user being able to press down sax keys manually, too
	 *	eg/ keyboard works as saxophone keys
	 *	eg/ user can click on keys to press them
	 *	eg/ user can press keys on the screen to press them
	 */
	const leftHandMainKeys = keyLayout['lh-main']

	console.log(leftHandMainKeys)
	return (
		<group {...props}>
			{/* fork f, b, bis b, c, and g keys */}
			{leftHandMainKeys &&
				leftHandMainKeys.toReversed().map(({ group, keyId, name }, index) => (
					<>
						<LeftHandMainKey
							position={[0, index, 0]}
							key={keyId}
							group={group}
							name={name}
							keyId={keyId}
						/>
						<Text fontSize={0.4} position={[-2, index, 0]}>
							{keyId}
						</Text>
					</>
				))}
		</group>
	)
}

export default LeftHandMainKeys
