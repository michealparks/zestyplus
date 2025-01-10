<script
	lang="ts"
	module
>
	import type { AddAxisMap } from './types'
	import { Vector3 } from 'three'

	const map: AddAxisMap = {
		x: 'addPlaneX',
		y: 'addPlaneY',
		z: 'addPlaneZ',
	} as const

	const position = new Vector3()
</script>

<script lang="ts">
	import { MeshBasicMaterial } from 'three'
	import { T, useTask, type Props } from '@threlte/core'
	import { MarchingCube } from './MarchingCube'
	import { MarchingCubes } from 'three/examples/jsm/Addons.js'
	import { MarchingPlane } from './MarchingPlane'

	type MarchingCubesProps = {
		resolution?: number
		enableUvs?: boolean
		enableColors?: boolean
		isolation?: number
	} & Props<MarchingCubes>

	let {
		resolution = 75,
		children,
		ref = $bindable(),
		...props
	}: MarchingCubesProps = $props()

	const material = new MeshBasicMaterial()
	const marchingCubes = new MarchingCubes(
		resolution,
		material,
		true,
		true,
		100_000
	)
	marchingCubes.scale.setScalar(2)

	$effect(() => {
		if (resolution !== marchingCubes.resolution) {
			marchingCubes.init(resolution)
		}
	})

	// cleanup default material if marchingCubes.material has been set to something else
	$effect(() => {
		return () => {
			if (marchingCubes.material !== material) {
				material.dispose()
			}
		}
	})

	useTask(() => {
		marchingCubes.reset()

		for (const child of marchingCubes.children) {
			if (child instanceof MarchingCube) {
				child.getWorldPosition(position)

				// center it
				position.addScalar(1).multiplyScalar(0.5)

				marchingCubes.addBall(
					position.x,
					position.y,
					position.z,
					child.strength,
					child.subtract,
					child.color
				)
			} else if (child instanceof MarchingPlane) {
				marchingCubes[map[child.axis]](child.strength, child.subtract)
			}
		}

		marchingCubes.update()
	})
</script>

<T
	is={marchingCubes}
	bind:ref
	{...props}
>
	{@render children?.({ ref: marchingCubes })}
</T>
