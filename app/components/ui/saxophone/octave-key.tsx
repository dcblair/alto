import { Text } from '@react-three/drei'
import { type GroupProps } from '@react-three/fiber'
import { fingerings, keyLayout } from '#app/constants/keys.js'

interface LeftHandMainKeyProps extends GroupProps {
	note: string
	octave: number
}

const OctaveKey = ({ note, octave, ...props }: LeftHandMainKeyProps) => {
	const { keyId, name } = keyLayout.octave?.[0]!
	const currentFingerings = fingerings.octave[octave][note].keyIds

	const isArrayNested = currentFingerings.some((innerArray: []) =>
		Array.isArray(innerArray),
	)

	const isPressed = isArrayNested
		? currentFingerings[0].some((fingering: any) => fingering === keyId)
		: currentFingerings.some((selectedKeyId: string) => selectedKeyId === keyId)

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
