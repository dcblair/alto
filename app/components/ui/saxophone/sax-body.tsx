import { type MeshProps } from '@react-three/fiber'

interface SaxBodyProps extends MeshProps {}

const SaxBody = ({ ...props }: SaxBodyProps) => {
	return (
		<mesh {...props}>
			<cylinderGeometry args={[1, 1, 10, 32]} />
			<meshBasicMaterial color="blue" />
		</mesh>
	)
}

export default SaxBody
