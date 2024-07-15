import { Text } from '@react-three/drei'
import { type GroupProps } from '@react-three/fiber'
import { fingerings, keyLayout } from '#app/constants/keys.js'
import { determineIsPressed } from '#app/utils/keys-helpers.js'

interface LeftHandMainKeyProps extends GroupProps {
	note: string
	octave: number
}

const OctaveKey = ({ note, octave, ...props }: LeftHandMainKeyProps) => {
	const { keyId, name } = keyLayout.octave?.[0]!
	const currentFingerings = fingerings.octave[octave][note].keyIds

	const isPressed = determineIsPressed(currentFingerings, keyId)

	return (
		<group {...props}>
			<mesh position={[0, 0, 0]}>
				<circleGeometry args={[0.4, 32]} />
				<meshBasicMaterial color={isPressed ? 'red' : 'gold'} />
			</mesh>
			<Text position={[-2.5, 0, 0]}>{name}</Text>
		</group>
	)
}

export default OctaveKey
