<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core'
	import { Grid, OrbitControls } from '@threlte/extras'
	import { Line2, LineMaterial, LineGeometry } from 'three/addons'
	import { shiftAndAddVector } from '../../../lib/array'
	import { hueShift } from '$lib/color'
	import { useAnalyser } from '$lib'
	import { Color, Mesh, Vector3 } from 'three'
	import { fade } from '$lib/transitions'

	const { frequencyData, analyserReady } = useAnalyser()
	const { camera } = useThrelte()

	let numLines = 60
	let lineLength = 350
	let grid = $state<Mesh>()

	const color = new Color('red')

	const lines: {
		id: string
		geometry: LineGeometry
		material: LineMaterial
		positions: Float32Array
	}[] = []

	for (let i = 0; i < numLines; i += 1) {
		const geometry = new LineGeometry()
		const material = new LineMaterial()

		const dir = i % 2 === 0 ? 1 : -1
		const positions = new Float32Array(lineLength * 3)

		for (let j = 0, l = lineLength * 3; j < l; j += 3) {
			positions[j + 0] = dir * 10
			positions[j + 1] = i / 5
		}
		geometry.setPositions(positions)

		lines.push({
			id: crypto.randomUUID(),
			geometry,
			material,
			positions,
		})
	}

	useTask((delta) => {
		const speed = delta * 8
		const z = (camera.current.position.z -= speed)

		if (grid !== undefined) {
			grid.position.z = z
		}
	})

	const { start } = useTask(
		() => {
			const { z } = camera.current.position

			for (let i = 0, l = lines.length; i < l; i += 1) {
				const line = lines[i]
				const dir = i % 2 === 0 ? 1 : -1
				const fft = frequencyData.current[i]

				if (fft === undefined) continue

				const x = (fft / 20) * dir

				shiftAndAddVector(line.positions, x, i / 5, z - 10)
				line.geometry.setPositions(line.positions)
			}
		},
		{ autoStart: false }
	)

	$effect(() => {
		if (analyserReady.current) {
			setTimeout(() => start(), 500)
		}
	})

	let view = $state('forward')

	const target = new Vector3()
	const vec3 = new Vector3()

	useTask((delta) => {
		const { z } = camera.current.position
		if (view === 'forward') {
			camera.current.position.lerp(vec3.set(0, 4, z), delta)
			target.lerp(vec3.set(0, 4, z - 10), delta)
		} else {
			camera.current.position.lerp(vec3.set(0, 15, z), delta)
			target.lerp(vec3.set(0, 2, z - 8), delta)
		}
		camera.current.lookAt(target)
	})

	$effect(() => {
		const id = setInterval(() => {
			view = view === 'forward' ? 'top' : 'forward'
		}, 60_000)
		return () => clearInterval(id)
	})
</script>

<T.PerspectiveCamera
	makeDefault
	fov={100}
	position={[0, 4, 10]}
	oncreate={(ref) => ref.lookAt(0, 2, 0)}
></T.PerspectiveCamera>

<Grid
	bind:ref={grid}
	infiniteGrid
	type="lines"
	axis="x"
	cellColor={new Color(0.1, 0.1, 0.1)}
	sectionColor="white"
/>

{#each lines as line, index (line.id)}
	<T is={Line2}>
		<T
			is={line.material}
			linewidth={1.5}
			color={hueShift(color, index / 2000)}
			transition={fade}
		/>
		<T is={line.geometry} />
	</T>
{/each}
