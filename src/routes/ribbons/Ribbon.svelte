<script lang="ts">
	import { Vector3, CatmullRomCurve3, Color, Mesh } from 'three'
	import { T, useTask } from '@threlte/core'
	import { MeshLineMaterial, MeshLineGeometry } from '@threlte/extras'

	let { baseWidth = 0.3, baseDashOffset = 0, ...rest } = $props()

	// create a smooth curve from 4 points
	const curve = new CatmullRomCurve3([
		new Vector3(-3, 0, 0),
		new Vector3(-1, 1, -1),
		new Vector3(1, -1, 1),
		new Vector3(3, 0, 0),
	])

	// convert curve to an array of 100 points
	const points = curve.getPoints(100)

	let width = $state(0.5)
	let dashOffset = $state(baseDashOffset)

	let color = new Color()
	const orange = new Color('#fe3d00')
	const purple = new Color('#9800fe')

	const mesh = new Mesh()

	useTask((delta) => {
		// every frame we:
		// increase the dash offset
		dashOffset += delta / 2
		// transition between two colors
		color.lerpColors(orange, purple, Math.sin(dashOffset * 2) / 2 + 0.5)
		// shrink and grow the line width
		width = Math.max(Math.sin(dashOffset * 2) / 5 + baseWidth, 0.01)
	})
</script>

<T
	is={mesh}
	position.y={3}
	scale={2}
	{...rest}
>
	<MeshLineGeometry {points} />
	<MeshLineMaterial
		{width}
		{color}
		dashArray={0.5}
		dashRatio={0.5}
		{dashOffset}
		transparent
		depthTest={false}
	/>
</T>
