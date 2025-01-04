<script lang="ts">
	import { useAnalyser } from '$lib'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { RoundedBoxGeometry } from '@threlte/extras'
	import { Matrix4, Mesh } from 'three'

	import Lightformer from '$lib/components/Lightformer.svelte'

	const { camera } = useThrelte()

	const { frequencyData } = useAnalyser()

	const rotationMatrix = new Matrix4()
		.makeRotationX(0.005)
		.multiply(new Matrix4().makeRotationY(0.005))
		.multiply(new Matrix4().makeRotationZ(0.005))

	const translateMatrix = new Matrix4()
	const numberCubes = 27
	const cubes: Mesh[] = []
	let index = 0

	const cubeTranslation = (index_: number, n: number) => {
		const x = (index_ % 3) * n - n
		const y = (((index_ % 9) / 3) | 0) * n - n
		const z = ((index_ / 9) | 0) * n - n
		translateMatrix.makeTranslation(x, y, z)
	}

	while (index < numberCubes) {
		const cube = new Mesh()
		cube.castShadow = true
		cube.receiveShadow = true
		cubes.push(cube)

		cubeTranslation(index, 1)
		cube.applyMatrix4(translateMatrix)

		index += 1
	}

	let x = 0

	useTask(() => {
		x += 0.05
		camera.current.applyMatrix4(rotationMatrix)

		for (const [index, cube] of cubes.entries()) {
			cubeTranslation(
				index,
				(Math.sin(x) * 0.01 * frequencyData.current[32]) / 10
			)
			cube.applyMatrix4(translateMatrix)
		}
	})

	$inspect(frequencyData.current[64] / 100)
</script>

<T.PerspectiveCamera
	makeDefault
	position.y={1}
	position.z={10}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
/>

<T.AmbientLight intensity={0.3} />
<T.DirectionalLight
	intensity={1}
	position={[0, 3, 0]}
/>
<T.DirectionalLight
	intensity={0.5}
	position={[0, 3, 2]}
/>
<T.DirectionalLight
	intensity={0.25}
	position={[2, 1, 2]}
/>

{#each cubes as cube}
	<T is={cube}>
		<RoundedBoxGeometry
			smoothness={10}
			creaseAngle={1}
			radius={0.2}
		/>
		<T.MeshStandardMaterial roughness={0.15} />
	</T>
{/each}

<Lightformer />
