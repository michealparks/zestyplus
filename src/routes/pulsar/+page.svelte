<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { Line2, LineMaterial, LineGeometry } from 'three/addons'

	const count = 30
	const lineVertices = 128

	let lines: Line2[] = []
	let points = new Float32Array(lineVertices)

	for (let i = 0; i < count; i += 1) {
		const geometry = new LineGeometry()
		const material = new LineMaterial()
		const line = new Line2(geometry, material)
		lines.push(line)
	}

	let currentLine = 0

	setInterval(() => {
		for (let i = 0; i < lineVertices; i += 3) {
			points[i + 0] = i / 100
			points[i + 1] = Math.random() / 10
			points[i + 2] = Math.random() / 100
		}

		console.log(points)
		lines[currentLine].geometry.setPositions(points)
		lines[currentLine].position.set(-1, 0, 0)

		currentLine += 1
		currentLine %= lines.length
	}, 1000)

	useTask((delta) => {
		for (const line of lines) {
			line.position.y += delta
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
