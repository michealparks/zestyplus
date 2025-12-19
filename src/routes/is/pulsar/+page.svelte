<script lang="ts">
	import { useAnalyser } from '$lib'
	import { normalizeToUnitIntervalLog } from '$lib/math'
	import { T, useTask } from '@threlte/core'
	import { Line2 } from 'three/addons/lines/webgpu/Line2.js'
	import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
	import { Line2NodeMaterial } from 'three/webgpu'
	import { SvelteSet } from 'svelte/reactivity'

	const analyser = useAnalyser()

	const count = 80
	const lineVertices = 256

	let lines: Line2[] = []
	let activeLines = new SvelteSet<Line2>()
	let points = new Float32Array(lineVertices * 3)

	for (let i = 0; i < count; i += 1) {
		const geometry = new LineGeometry()
		const material = new Line2NodeMaterial()
		material.transparent = true

		const line = new Line2(geometry, material)
		lines.push(line)
	}

	let currentLine = 0

	setInterval(() => {
		const fftArray = analyser.spectrum01

		let midpoint = lineVertices / 2
		let posMidpoint = (lineVertices * 3) / 2
		let index = midpoint
		let fft = 0

		for (let i = 0, j = 0, k = 0; i < midpoint + 1; i += 1, j += 3, k += 1) {
			fft = fftArray[k] ?? 0

			index = posMidpoint + j
			points[index + 0] = (midpoint + i) / 75
			points[index + 1] = fft * 1.5 - 1
			points[index + 2] = 0.0001

			fft = fftArray[k + 1] ?? 0
			index = posMidpoint - j
			points[index + 0] = (midpoint - i) / 75
			points[index + 1] = fft * 1.5 - 1
			points[index + 2] = 0.0001
		}

		lines[currentLine].geometry.setPositions(points)
		lines[currentLine].position.set(-1.75, 0, 0)

		activeLines.add(lines[currentLine])

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
	position.y={0}
></T.PerspectiveCamera>

{#each activeLines as line (line.uuid)}
	<T is={line} />
{/each}
