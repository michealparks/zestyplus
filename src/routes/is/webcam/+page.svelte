<script lang="ts">
	import { provideWebcamTexture } from '$lib/hooks/useWebcamTexture.svelte'
	import { T, useTask } from '@threlte/core'
	import { createShader } from './shader'
	import { Mesh, DoubleSide } from 'three/webgpu'
	import Lightformer from '$lib/components/Lightformer.svelte'
	import { OrbitControls, Edges } from '@threlte/extras'
	import Speaker from './Speaker.svelte'
	import { useAnalyser } from '$lib'

	const webcam = provideWebcamTexture()
	const analyser = useAnalyser()

	const mat = createShader(webcam.texture)

	const record = new Mesh()
	const needleShoulder = new Mesh()

	let volume1 = $state(0)
	let volume2 = $state(0)

	useTask((dt) => {
		record.rotation.y -= dt
		needleShoulder.rotation.y -= dt / 1000

		volume1 = analyser.spectrum01[0]
		volume2 = analyser.spectrum01[8]
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position={[3, 8, 6]}
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0)
	}}
>
	<OrbitControls />
</T.PerspectiveCamera>

<T.DirectionalLight
	castShadow
	position={[-4, 5, 6]}
	shadow.mapSize.x={2048}
	shadow.mapSize.y={2048}
/>
<T.AmbientLight />

<T.Mesh
	name="record-player"
	castShadow
	receiveShadow
	position.y={0.3}
>
	<T.BoxGeometry args={[2.8, 0.3, 2.3]} />
	<T.MeshStandardMaterial
		roughness={0.5}
		color="#bbb"
	/>
	<Edges color="black" />

	<T
		is={needleShoulder}
		name="needle-shoulder"
		position.y={0.28}
		position.x={1.15}
		position.z={-0.85}
		rotation.y={-Math.PI / 20}
		castShadow
		receiveShadow
	>
		<T.CylinderGeometry args={[0.1, 0.1, 0.15]} />
		<T.MeshStandardMaterial />
		<Edges
			color="black"
			thresholdAngle={80}
		/>

		<T.Mesh
			rotation.x={Math.PI / 2}
			position.z={0.75}
			castShadow
			receiveShadow
		>
			<T.CylinderGeometry args={[0.05, 0.05, 1.5]} />
			<T.MeshStandardMaterial />
			<Edges
				color="black"
				thresholdAngle={80}
			/>
		</T.Mesh>
	</T>

	<T
		name="record"
		is={record}
		position.y={0.2}
		position.x={0.2}
		castShadow
		receiveShadow
	>
		<T.CylinderGeometry args={[1, 1, 0.02, 128]} />
		<T
			is={mat}
			color="red"
		/>
		<Edges
			color="black"
			thresholdAngle={80}
		/>

		<T.Mesh
			position.y={0.01}
			castShadow
		>
			<T.CylinderGeometry args={[0.35, 0.35, 0.001, 64]} />
			<T.MeshStandardMaterial
				roughness={0.5}
				side={DoubleSide}
				color="#bbb"
			/>
			<Edges color="black" />
		</T.Mesh>
	</T>
</T.Mesh>

<T.Mesh
	rotation.x={-Math.PI / 2}
	receiveShadow
>
	<T.PlaneGeometry args={[100, 100]} />
	<T.MeshStandardMaterial roughness={0.5} />
</T.Mesh>

<Speaker
	volume={volume1}
	position={[-3, 0, 0]}
	rotation.y={Math.PI / 8}
/>

<Speaker
	volume={volume2}
	position={[3, 0, 0]}
	rotation.y={-Math.PI / 8}
/>

<Lightformer />
