<script>
	import { useAnalyser } from '$lib'
	import { T, useTask } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { Mesh } from 'three'

	const { frequencyData } = useAnalyser()

	const left = new Mesh()
	const right = new Mesh()

	useTask(() => {
		left.scale.setScalar(frequencyData.current[0] / 50 + 1)
		left.position.x = -0.15 - frequencyData.current[0] / 300
		left.position.z = 0.15 + frequencyData.current[0] / 300
		right.scale.setScalar(frequencyData.current[0] / 50 + 1)
		right.position.x = 0.15 + frequencyData.current[0] / 300
		right.position.z = 0.15 + frequencyData.current[0] / 300
	})
</script>

<T.AmbientLight />
<T.DirectionalLight position={[1, 1, 1]} />

<T.PerspectiveCamera
	makeDefault
	position.z={5}
>
	<OrbitControls />
</T.PerspectiveCamera>

<T.Mesh>
	<!-- head -->
	<T.Mesh position.y={0.8}>
		<T.SphereGeometry args={[0.4]} />
		<T.MeshStandardMaterial />

		<T.Mesh
			position.x={-0.25}
			position.y={0.1}
			position.z={0.4}
		>
			<T.RingGeometry args={[0, 0.05]} />
			<T.MeshStandardMaterial color="black" />
		</T.Mesh>

		<T.Mesh
			position.x={0.25}
			position.y={0.1}
			position.z={0.4}
		>
			<T.RingGeometry args={[0, 0.05]} />
			<T.MeshStandardMaterial color="black" />
		</T.Mesh>

		<T.Mesh position.z={0.4}>
			<T.RingGeometry args={[0.1, 0.2]} />
			<T.MeshStandardMaterial color="red" />
		</T.Mesh>
	</T.Mesh>

	<T
		is={left}
		position.x={-0.15}
		position.y={0.08}
		position.z={0.15}
	>
		<T.SphereGeometry args={[0.2]} />
		<T.MeshStandardMaterial />

		<T.Mesh rotation.x={Math.PI / 2}>
			<T.CylinderGeometry args={[0.05, 0.1, 0.5]} />
			<T.MeshStandardMaterial color="hotpink" />
		</T.Mesh>
	</T>
	<T
		is={right}
		position.x={0.15}
		position.y={0.08}
		position.z={0.15}
	>
		<T.SphereGeometry args={[0.2]} />
		<T.MeshStandardMaterial />

		<T.Mesh rotation.x={Math.PI / 2}>
			<T.CylinderGeometry args={[0.05, 0.1, 0.5]} />
			<T.MeshStandardMaterial color="hotpink" />
		</T.Mesh>
	</T>

	<T.CylinderGeometry args={[0.1, 0.1]} />
	<T.MeshStandardMaterial />

	<T.Mesh
		rotation.z={Math.PI / 3}
		position.x={-0.25}
		position.y={0.3}
	>
		<T.CylinderGeometry args={[0.08, 0.08, 0.7]} />
		<T.MeshStandardMaterial />
	</T.Mesh>

	<T.Mesh
		rotation.z={-Math.PI / 3}
		position.x={0.25}
		position.y={0.3}
	>
		<T.CylinderGeometry args={[0.08, 0.08, 0.7]} />
		<T.MeshStandardMaterial />
	</T.Mesh>

	<T.Mesh
		rotation.z={(2 * Math.PI) / 3}
		position.x={-0.25}
		position.y={-0.5}
	>
		<T.CylinderGeometry args={[0.08, 0.08, 0.7]} />
		<T.MeshStandardMaterial />
	</T.Mesh>

	<T.Mesh
		rotation.z={(-2 * Math.PI) / 3}
		position.x={0.25}
		position.y={-0.5}
	>
		<T.CylinderGeometry args={[0.08, 0.08, 0.7]} />
		<T.MeshStandardMaterial />
	</T.Mesh>
</T.Mesh>
