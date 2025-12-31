<script lang="ts">
	import {
		Vector3,
		MathUtils,
		Color,
		CatmullRomCurve3,
		Line2NodeMaterial,
	} from 'three/webgpu'
	import { Line2 } from 'three/addons/lines/webgpu/Line2.js'
	import { LineGeometry } from 'three/addons/lines/LineGeometry.js'

	import { T, useTask, useThrelte } from '@threlte/core'
	import { hueShift, useAnalyser } from '$lib'

	const { camera } = useThrelte()

	const iterations = 200

	const lines: {
		line: Line2
		points: Vector3[]
		shift: Vector3
		opacity: number
		animating: boolean
	}[] = []

	// Generate Points for Harmonic Curves
	const shiftScale = 1

	// Generate random parameters
	const loops = MathUtils.randInt(2, 3) // Random number of loops
	const radius = MathUtils.randFloat(5, 6) // Random base radius
	const amplitude = MathUtils.randFloat(2, 10) // Random oscillation size
	const frequencyX = MathUtils.randFloat(2, 3) // Random X frequency
	const frequencyY = MathUtils.randFloat(2, 3) // Random Y frequency
	const twist = MathUtils.randFloat(0.5, 2) // Random twist factor for Z

	// Generate points
	const numPoints = 2000 // Total points for smoothness

	let color = $state.raw(new Color('red').setHSL(Math.random(), 0.8, 0.5))

	for (let i = 0; i < iterations; i += 1) {
		const shift = new Vector3(
			Math.random() * shiftScale,
			Math.random() * shiftScale,
			Math.random() * shiftScale
		)

		const points: Vector3[] = []

		for (let i = 0; i < numPoints; i += 1) {
			const t = (i / numPoints) * Math.PI * 2 * loops // Map points around loops
			const x = Math.sin(t * frequencyX) * (radius + amplitude * Math.sin(t))
			const y = Math.cos(t * frequencyY) * (radius + amplitude * Math.cos(t))
			const z = amplitude * Math.sin(t * twist) // Add twist in Z for depth
			points.push(new Vector3(x, y, z))
		}

		const line = new Line2()
		lines.push({ line, points, shift, opacity: 0, animating: false })
	}

	const analyser = useAnalyser()

	// Animation Variables
	let progress = 0 // Tracks progress along the curve

	const animateCamera = () => {
		const curve = new CatmullRomCurve3(lines.at(0)?.points) // Create a smooth path
		const point = curve.getPointAt(progress) // Get position along the curve

		// Move camera to point
		camera.current.position.copy(point)
		camera.current.lookAt(0, 0, 0) // Make camera face center

		// Increment progress and loop back at 1.0
		progress += 0.0001 // Controls speed
		if (progress > 1) {
			progress = 0 // Loop seamlessly
		}
	}

	useTask(() => {
		let count = 0

		for (let i = 0, l = lines.length; i < l; i += 1) {
			const { line, opacity, animating } = lines[i]

			if (animating && opacity > 0) {
				lines[i].opacity -= 0.005
			} else if (analyser.spectrum01[i % 128] > 0.2) {
				lines[i].opacity = 0.4
				lines[i].animating = true
				count += 1
			}

			line.material.opacity = lines[i].opacity
		}

		if (count >= 10) {
			color = color.setHSL(Math.random(), 0.8, 0.5)
		}

		animateCamera()
	})
</script>

<T.PerspectiveCamera
	makeDefault
	position.z={20}
>
	<!-- <OrbitControls
		autoRotate
		autoRotateSpeed={0.2}
		enablePan={false}
		enableRotate={false}
		enableZoom={false}
	/> -->
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.6} />
<T.PointLight
	intensity={1}
	position={[10, 10, 10]}
/>

{#each lines as { line, shift, points } (line.uuid)}
	<T
		is={line}
		oncreate={(ref) => {
			ref.position.copy(shift)
			ref.geometry.setFromPoints(points)
		}}
	>
		<T is={LineGeometry} />
		<T
			is={Line2NodeMaterial}
			transparent
			color={hueShift(color, 0.01)}
		/>
	</T>
{/each}
