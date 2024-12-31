<script>
	import { T, useTask } from '@threlte/core'
	import {
		MeshLineMaterial,
		MeshLineGeometry,
		Grid,
		OrbitControls,
	} from '@threlte/extras'

	import { Vector3, CatmullRomCurve3, Color } from 'three'

	// create a smooth curve from 4 points
	const curve = new CatmullRomCurve3([
		new Vector3(-3, 0, 0),
		new Vector3(-1, 1, -1),
		new Vector3(1, -1, 1),
		new Vector3(3, 0, 0),
	])

	// convert curve to an array of 100 points
	const points = curve.getPoints(100)
	let width = 0.5
	let dashOffset = 0
	let color = new Color()
	const orange = new Color('#fe3d00')
	const purple = new Color('#9800fe')

	useTask((delta) => {
		// every frame we:
		// increase the dash offset
		dashOffset += delta / 2
		// transition between two colors
		color.lerpColors(orange, purple, Math.sin(dashOffset * 2) / 2 + 0.5)
		// shrink and grow the line width
		width = Math.sin(dashOffset * 2) / 5 + 0.3
	})
</script>

<T.PerspectiveCamera makeDefault>
	<OrbitControls
		autoRotate={true}
		autoRotateSpeed={2}
		enablePan={false}
		enableRotate={false}
		enableZoom={false}
		target.y={2}
	/>
</T.PerspectiveCamera>

<T.Mesh
	position.y={3}
	scale={2}
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
</T.Mesh>
