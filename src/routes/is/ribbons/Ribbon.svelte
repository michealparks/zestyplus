<script module>
	// create a smooth curve from 4 points
	const curve = new CatmullRomCurve3([
		new Vector3(-3, 0, 0),
		new Vector3(-1, 1, -1),
		new Vector3(1, -1, 1),
		new Vector3(3, 0, 0),
	])

	// convert curve to an array of 100 points
	const points = curve.getPoints(100)
	const orange = new Color('#fe3d00')
	const purple = new Color('#9800fe')
</script>

<script lang="ts">
	import type { Props as ThrelteProps } from '@threlte/core'
	import { Vector3, CatmullRomCurve3, Color, Mesh } from 'three'
	import { T, useTask } from '@threlte/core'
	import { MeshLineMaterial, MeshLineGeometry } from '@threlte/extras'

	interface Props extends ThrelteProps<Mesh> {
		baseWidth?: number
		baseDashOffset?: number
		dashOffset?: number
		opacity?: number
		dashRatio?: number
	}

	let {
		baseWidth = 0.3,
		baseDashOffset = 0,
		opacity = 1,
		dashRatio = 0.8,
		dashOffset,
		...rest
	}: Props = $props()

	let offset = $derived(dashOffset ?? baseDashOffset)

	const mesh = new Mesh()

	useTask((delta) => {
		const { uniforms } = mesh.material

		// every frame we:
		// increase the dash offset
		if (!dashOffset) {
			uniforms.dashOffset.value += delta / 2
		}

		// transition between two colors
		uniforms.color.value.lerpColors(orange, purple, Math.sin(delta * 8) + 0.5)
		// shrink and grow the line width
		uniforms.lineWidth.value = Math.max(
			Math.sin(offset * 2) / 5 + baseWidth,
			0.01
		)
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
		width={0.5}
		dashArray={1.1}
		{dashRatio}
		dashOffset={offset}
		transparent
		{opacity}
		depthTest={false}
	/>
</T>
