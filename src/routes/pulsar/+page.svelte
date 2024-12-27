<script lang="ts">
	import { useAnalyser } from '$lib'
	import { normalizeToUnitIntervalLog } from '$lib/math'
	import { T, useTask } from '@threlte/core'
	import { Line2, LineMaterial, LineGeometry } from 'three/addons'

	const { frequencyData } = useAnalyser()

	const count = 80
	const lineVertices = 1600

	let lines: Line2[] = []
	let points = new Float32Array(lineVertices)

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
		for (let i = 0, j = 0; i < lineVertices; i += 1, j += 3) {
			const index = (i + fftArray.length / 2) % fftArray.length
			const fft = fftArray[index] ?? 0

			points[j + 0] = i / 150
			points[j + 1] = fft / 200 - 1
			points[j + 2] = 0.0001
		}

		lines[currentLine].geometry.setPositions(points)
		lines[currentLine].position.set(-2, 0, 0)

		currentLine += 1
		currentLine %= lines.length
	}, 80)

	useTask((delta) => {
		for (const line of lines) {
			line.position.y += delta
			line.position.z -= delta / 2
			line.material.opacity =
				1 - normalizeToUnitIntervalLog(line.position.y, 0, 2.5, 100)
		}
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position.z={5}
/>

{#each lines as line}
	<T is={line} />
{/each}
