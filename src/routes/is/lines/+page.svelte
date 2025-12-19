<script lang="ts">
	import {
		Line2NodeMaterial,
		Color,
		MathUtils,
		Mesh,
		Vector3,
		PostProcessing,
		type WebGPURenderer,
	} from 'three/webgpu'
	import { toonOutlinePass } from 'three/tsl'
	import { Line2 } from 'three/addons/lines/webgpu/Line2.js'
	import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
	import { T, useTask, useThrelte } from '@threlte/core'
	import { shiftAndAddVector } from '../../../lib/array'
	import { hueShift } from '$lib/color'
	import { useAnalyser } from '$lib'
	import { fade } from '$lib/transitions'
	import Reflection from '$lib/components/Reflection.svelte'

	const analyser = useAnalyser()
	const { camera, scene, renderer, renderMode } = useThrelte<WebGPURenderer>()

	const postProcessing = new PostProcessing(renderer)

	$effect(() => {
		postProcessing.outputNode = toonOutlinePass(scene, $camera)
	})

	$effect(() => {
		renderMode.set('manual')
		return () => renderMode.set('always')
	})

	useTask(() => {
		postProcessing.render()
	})

	let numLines = 60
	let lineLength = 350
	let grid = $state<Mesh>()

	const color = new Color('red')

	const lines: {
		line: Line2
		geometry: LineGeometry
		material: Line2NodeMaterial
		positions: Float32Array
	}[] = []

	for (let i = 0; i < numLines; i += 1) {
		const line = new Line2()
		const geometry = new LineGeometry()
		const material = new Line2NodeMaterial()

		const dir = i % 2 === 0 ? 1 : -1
		const positions = new Float32Array(lineLength * 3)

		for (let j = 0, l = lineLength * 3; j < l; j += 3) {
			positions[j + 0] = dir * 10
			positions[j + 1] = i / 5
		}
		geometry.setPositions(positions)

		lines.push({
			line,
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

	useTask(() => {
		const { z } = camera.current.position

		for (let i = 10, l = lines.length; i < l; i += 1) {
			const line = lines[i]
			const dir = i % 2 === 0 ? 1 : -1

			const x = analyser.log01[i * 7] * 20 * dir

			shiftAndAddVector(line.positions, x, i / 5, z - 10)
			line.geometry.setPositions(line.positions)
			line.material.opacity = MathUtils.lerp(
				line.material.opacity,
				Math.abs(x / 20),
				0.1
			)
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

{#each lines as { line, material, geometry }, index (line.uuid)}
	<T is={line}>
		<T
			is={material}
			linewidth={1.5}
			color={hueShift(color, index / 2000)}
			transition={fade}
		/>
		<T is={geometry} />
	</T>
{/each}

<Reflection />
