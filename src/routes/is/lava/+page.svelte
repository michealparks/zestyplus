<script lang="ts">
	import { Vector2 } from 'three'
	import { T, useTask } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import MarchingCubes from './MarchingCubes.svelte'
	import { MarchingCube } from './MarchingCube'
	import { MarchingPlane } from './MarchingPlane'
	import { useAnalyser } from '$lib'
	import Lightformer from '$lib/components/Lightformer.svelte'

	const analyser = useAnalyser()

	const count = 20
	const scale = 0.2
	const balls: { marchingCube: MarchingCube }[] = []

	const vec2 = new Vector2()

	for (let i = 0; i < count; i += 1) {
		const x = (Math.random() - 0.5) * 2
		const y = (Math.random() - 0.5) * 2
		const position = vec2.set(x, y).multiplyScalar(scale)

		const marchingCube = new MarchingCube()
		marchingCube.color.setRGB(Math.random(), Math.random(), Math.random())
		marchingCube.position.set(position.x, -1, position.y)

		balls.push({ marchingCube })
	}

	let elapsed = 0
	useTask((delta) => {
		elapsed += delta

		for (let i = 0; i < count; i += 1) {
			const { marchingCube } = balls[i]

			if (
				elapsed >= 1 &&
				analyser.level > 0.001 &&
				marchingCube.animating === ''
			) {
				marchingCube.animating = 'up'
				marchingCube.userData.x = -Math.PI / 2
				elapsed = 0
				continue
			}

			if (marchingCube.animating) {
				marchingCube.position.y = 0.5 * Math.sin(marchingCube.userData.x) - 0.5
				marchingCube.userData.x += delta
				if (marchingCube.userData.x >= (3 * Math.PI) / 2) {
					marchingCube.animating = ''
				}
			}
		}
	})

	const plane = new MarchingPlane()
	plane.axis = 'y'
</script>

<T.PerspectiveCamera
	makeDefault
	position.z={15}
	position.y={5}
	zoom={4}
	oncreate={(ref) => ref.lookAt(0, -1, 0)}
>
	<OrbitControls
		autoRotate
		enablePan={false}
		enableRotate={false}
		enableZoom={false}
		target={[0, -1, 0]}
	/>
</T.PerspectiveCamera>

<T.AmbientLight />
<T.DirectionalLight intensity={3} />

<MarchingCubes>
	<T.MeshStandardMaterial
		vertexColors
		roughness={0.01}
	/>
	{#each balls as { marchingCube } (marchingCube.uuid)}
		<T is={marchingCube} />
	{/each}
	<T is={plane} />
</MarchingCubes>

<T.Mesh position={[0, -2.1, 0]}>
	<T.BoxGeometry args={[200, 0.1, 200]} />
	<T.MeshStandardMaterial
		roughness={0.1}
		color="#333333"
	/>
</T.Mesh>

<Lightformer />
