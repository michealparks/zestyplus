<script lang="ts">
	import { useAnalyser } from '$lib'
	import { normalizeToUnitIntervalLog } from '$lib/math'
	import { T, useTask } from '@threlte/core'
	import { Grid, OrbitControls } from '@threlte/extras'
	import { Line2, LineMaterial, LineGeometry } from 'three/addons'

	const { frequencyData } = useAnalyser()

	const count = 80
	const lineVertices = 256

	let lines: Line2[] = []
	let points = new Float32Array(lineVertices * 3)

	for (let i = 0; i < count; i += 1) {
		const geometry = new LineGeometry()
		const material = new LineMaterial()
		material.transparent = true

		const line = new Line2(geometry, material)
		lines.push(line)
	}

	let currentLine = 0

	setInterval(() => {
		const fftArray = frequencyData.current

		let midpoint = lineVertices / 2
		let posMidpoint = (lineVertices * 3) / 2
		let index = midpoint
		let fft = 0

		for (let i = 0, j = 0, k = 0; i < midpoint + 1; i += 1, j += 3, k += 2) {
			fft = fftArray[k] ?? 0

			index = posMidpoint + j
			points[index + 0] = (midpoint + i) / 75
			points[index + 1] = fft / 400 - 1
			points[index + 2] = 0.0001

			fft = fftArray[k + 1] ?? 0
			index = posMidpoint - j
			points[index + 0] = (midpoint - i) / 75
			points[index + 1] = fft / 400 - 1
			points[index + 2] = 0.0001
		}

		// for (let i = 0, j = 0; i < lineVertices; i += 1, j += 3) {
		// 	const index = (i + fftArray.length / 4) % fftArray.length
		// 	const fft = fftArray[index] ?? 0

		// 	points[j + 0] = i / 150
		// 	points[j + 1] = fft / 200 - 1
		// 	points[j + 2] = 0.0001
		// }

		lines[currentLine].geometry.setPositions(points)
		lines[currentLine].position.set(-1.75, 0, 0)

		currentLine += 1
		currentLine %= lines.length
	}, 150)

	useTask((delta) => {
		for (const line of lines) {
			line.position.y += delta / 2
			line.position.z -= delta / 3
			line.material.opacity =
				1 - normalizeToUnitIntervalLog(line.position.y, 0, 2, 100)
		}
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position.z={2.5}
	position.y={-1}
>
	<OrbitControls />
</T.PerspectiveCamera>

{#each lines as line}
	<T is={line} />
{/each}

<!-- <Grid infiniteGrid /> -->
