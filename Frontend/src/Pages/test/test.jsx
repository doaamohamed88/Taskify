import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Glitch } from '@react-three/postprocessing'

function Boards() {
    const boards = useRef()
    useFrame(({ mouse }) => {
        boards.current.rotation.y = mouse.x * 0.2
        boards.current.rotation.x = mouse.y * 0.1
    })

    return (
        <group ref={boards}>
            {[0, 1, 2].map((i) => (
                <mesh position={[i * 3 - 3, 0, -i * 2]} key={i}>
                    <planeGeometry args={[5, 3, 1]} />
                    <meshStandardMaterial
                        color={['#667eea', '#764ba2', '#84fab0'][i]}
                        transparent
                        opacity={0.15}
                        emissiveIntensity={0.3}
                    />
                </mesh>
            ))}
        </group>
    )
}

export default Boards;