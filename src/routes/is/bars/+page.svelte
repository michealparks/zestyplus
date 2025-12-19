<script lang="ts">
	import { Color, InstancedMesh, Matrix4, Quaternion, Vector3 } from 'three'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { useAnalyser, hueShift } from '$lib'

	let debug = false

	const { scene, size } = useThrelte()
	const analyser = useAnalyser()

	const count = 128
	const gap = 1
	const offset = (count * gap) / 2

	const color = new Color('red')
	const position = new Vector3()
	const quaternion = new Quaternion()
	const scale = new Vector3(1, 1, 1)
	const matrix = new Matrix4()
	const mesh = new InstancedMesh(undefined, undefined, count)

	for (let i = 0; i < count; i += 1) {
		position.set(0, 0, i * gap - offset)
		matrix.setPosition(position)
		mesh.setMatrixAt(i, matrix)
		mesh.setColorAt(i, hueShift(color, i / 10000))
	}

	mesh.instanceMatrix.needsUpdate = true
	if (mesh.instanceColor) {
		mesh.instanceColor.needsUpdate = true
	}

	useTask(() => {
		console.log(count, analyser.spectrum01.length)
		for (let i = 0, l = count; i < l; i += 1) {
			const barHeight = analyser.spectrum01[i]

			if (barHeight) {
				mesh.getMatrixAt(i, matrix)
				matrix.decompose(position, quaternion, scale)
				position.y = barHeight * 20
				scale.set(1, position.y * 4 + 1, 1)
				matrix.compose(position, quaternion, scale)
				mesh.setMatrixAt(i, matrix)
			}
		}

		mesh.instanceMatrix.needsUpdate = true
	})
</script>

<T.OrthographicCamera
	makeDefault
	position={[-20, 20, 20]}
	zoom={$size.width / 175}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
	near={-200}
	far={200}
/>

<T.AmbientLight intensity={0.5} />

<T.DirectionalLight
	castShadow
	shadow.camera.left={-200}
	shadow.camera.right={200}
	shadow.camera.top={200}
	shadow.camera.bottom={-200}
	shadow.mapSize.width={4096}
	shadow.mapSize.height={4096}
	intensity={3}
	position={[30, 30, 10]}
>
	{#snippet children({ ref })}
		{#if debug}
			<T.DirectionalLightHelper
				args={[ref]}
				attach={scene}
			/>
		{/if}
	{/snippet}
</T.DirectionalLight>

<T.Mesh
	rotation.x={-Math.PI / 2}
	position.y={-0.02}
	receiveShadow
>
	<T.PlaneGeometry args={[500, 500]} />
	<T.MeshStandardMaterial color="black" />
</T.Mesh>

<T
	is={mesh}
	castShadow
	receiveShadow
>
	<T.BoxGeometry args={[0.5, 0.5, 0.5]} />
	<T.MeshStandardMaterial />
</T>
