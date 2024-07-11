import { type MeshProps } from '@react-three/fiber'
import { useRef } from 'react'
import { type Mesh } from 'three'
import { type acceptedKeys } from '#app/constants/keys.js'

interface SaxKeyProps extends MeshProps {
	hasKeyPearl?: boolean
	// isPressed?: boolean;
	keyId: number
	note: (typeof acceptedKeys)[number] | null
	// onClick: () => void;
}

const SaxKey = ({
	note,
	hasKeyPearl = false,
	keyId,
	...props
}: SaxKeyProps) => {
	const meshRef = useRef() as React.MutableRefObject<Mesh>
	// give each key a number and map as pressed or not based on note

	/** todo: consider user being able to press down sax keys manually, too
	 *	eg/ keyboard works as saxophone keys
	 *	eg/ user can click on keys to press them
	 *	eg/ user can press keys on the screen to press them
	 */
	const isPressed = note === 'a' && (keyId === 1 || keyId === 3) ? true : false

	return (
		<mesh ref={meshRef} {...props}>
			<circleGeometry args={[1, 32]} />
			<meshBasicMaterial color={isPressed ? 'red' : 'white'} />
		</mesh>
	)
}

export default SaxKey
