<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core'
	import { Grid } from '@threlte/extras'
	import { Line2, LineMaterial, LineGeometry } from 'three/addons'
	import { shiftAndAddVector } from '../../lib/array'
	import { hueShift } from '$lib/color'
	import { useAnalyser } from '$lib'
	import { Color, Mesh } from 'three'

	const { frequencyData } = useAnalyser()
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

		const positions = new Float32Array(lineLength * 3)
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

		for (let i = 0, l = lines.length; i < l; i += 1) {
			const line = lines[i]
			const dir = i % 2 === 0 ? 1 : -1
			const fft = frequencyData.current[i]

			if (fft === undefined) continue

			const x = (fft / 20) * dir

			shiftAndAddVector(line.positions, x, i / 5, z - 10)
			line.geometry.setPositions(line.positions)
		}
	})
</script>

<T.PerspectiveCamera
	makeDefault
	fov={100}
	position={[0, 4, 10]}
	oncreate={(ref) => {
		ref.lookAt(0, 2, 0)
	}}
/>

<Grid
	bind:ref={grid}
	infiniteGrid
	type="lines"
	axis="x"
	cellColor="white"
	sectionColor="white"
/>

{#each lines as line, index (line.id)}
	<T is={Line2}>
		<T
			is={line.material}
			transparent
			linewidth={1.5}
			color={hueShift(color, index / 2000)}
		/>
		<T is={line.geometry} />
	</T>
{/each}
