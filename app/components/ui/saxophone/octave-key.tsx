import { Text } from '@react-three/drei'
import { type GroupProps } from '@react-three/fiber'
import { useContext } from 'react'
import { fingerings, keyLayout } from '#app/constants/keys.js'
import { KeyContext } from '#app/context/key-context.js'
import { determineIsPressed } from '#app/utils/keys-helpers.js'

interface LeftHandMainKeyProps extends GroupProps {}

const OctaveKey = ({ ...props }: LeftHandMainKeyProps) => {
	const { note, currentOctave, selectedFingering } = useContext(KeyContext)
	const { keyId, name } = keyLayout.octave?.[0]!
	const currentFingerings = fingerings.octave[currentOctave][note].keyIds

	const isPressed = determineIsPressed(
		currentFingerings,
		keyId,
		selectedFingering,
	)

	return (
		<group {...props}>
			<mesh position={[0, 0, 0]}>
				<circleGeometry args={[0.4, 32]} />
				<meshBasicMaterial color={isPressed ? 'red' : 'gold'} />
			</mesh>
			<Text fontSize={0.4} position={[-1.5, 0, 0]}>
				{name}
			</Text>
		</group>
	)
}

export default OctaveKey
