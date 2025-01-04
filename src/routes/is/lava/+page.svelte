<script lang="ts">
	import { Vector2, Color, Fog } from 'three'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import MarchingCubes from './MarchingCubes.svelte'
	import { MarchingCube } from './MarchingCube'
	import { MarchingPlane } from './MarchingPlane'
	import { useAnalyser } from '$lib'

	const { scene } = useThrelte()
	const { frequencyData } = useAnalyser()

	$effect(() => {
		scene.fog = new Fog('black')
		scene.fog.far = 10
		scene.fog.near = 8
		return () => (scene.fog = null)
	})

	const count = 30
	const scale = 0.5
	const balls: { marchingCube: MarchingCube }[] = []
	const m = (2 * Math.PI) / count

	const vec2 = new Vector2()

	for (let i = 0; i < count; i += 1) {
		// const r = m * i
		const x = (Math.random() - 0.5) * 2 // Math.cos(r)
		const y = (Math.random() - 0.5) * 2 // Math.sin(r)
		const position = vec2.set(x, y).multiplyScalar(scale)

		const marchingCube = new MarchingCube()
		marchingCube.color.setRGB(Math.random(), Math.random(), Math.random())
		marchingCube.position.set(position.x, -1, position.y)

		balls.push({ marchingCube })
	}

	let time = 0
	useTask((delta) => {
		time += delta
		for (let i = 0; i < count; i += 1) {
			const { marchingCube } = balls[i]
			const fft = frequencyData.current[i]

			if (fft > 150 && marchingCube.animating === '') {
				marchingCube.animating = 'up'
				marchingCube.userData.x = -Math.PI / 2
			}

			if (marchingCube.animating) {
				marchingCube.position.y = 0.5 * Math.sin(marchingCube.userData.x) - 0.5
				marchingCube.userData.x += delta
				if (marchingCube.userData.x >= (3 * Math.PI) / 2) {
					marchingCube.animating = ''
				}
			}

			// if (marchingCube.animating === 'up') {
			// 	marchingCube.position.y += dt
			// 	if (marchingCube.position.y >= 0.25) {
			// 		marchingCube.animating = 'down'
			// 	}
			// } else if (marchingCube.animating === 'down') {
			// 	marchingCube.position.y -= dt
			// 	if (marchingCube.position.y <= -1) {
			// 		marchingCube.animating = ''
			// 	}
			// }
		}
	})

	const plane = new MarchingPlane()
	plane.axis = 'y'
</script>

<T.PerspectiveCamera
	makeDefault
	position.z={5}
	position.y={2}
>
	<OrbitControls
		autoRotate
		enablePan={false}
		enableRotate={false}
		enableZoom={false}
	/>
</T.PerspectiveCamera>

<T.AmbientLight />
<T.DirectionalLight />

<MarchingCubes>
	<T.MeshStandardMaterial
		vertexColors
		roughness={0.01}
	/>
	{#each balls as { marchingCube }}
		<T is={marchingCube} />
	{/each}
	<T is={plane} />
</MarchingCubes>
