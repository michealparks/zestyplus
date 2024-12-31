<script lang="ts">
	import { DoubleSide } from 'three'
	import { T } from '@threlte/core'
	import { VirtualEnvironment, TransformControls } from '@threlte/extras'

	let debug = false
</script>

{#snippet lightformer(
	color: string,
	shape: 'circle' | 'plane',
	size: number,
	position: [number, number, number],
	visible: boolean
)}
	<T.Group {position}>
		{#snippet children({ ref })}
			{#if visible}
				<TransformControls object={ref} />
			{/if}
			<T.Mesh lookAt={[0, 0, 0]}>
				{#if shape === 'circle'}
					<T.CircleGeometry args={[size / 2]} />
				{:else}
					<T.PlaneGeometry args={[size, size]} />
				{/if}
				<T.MeshBasicMaterial
					{color}
					side={DoubleSide}
				/>
			</T.Mesh>
		{/snippet}
	</T.Group>
{/snippet}
<VirtualEnvironment visible={debug}>
	{@render lightformer('#FF4F4F', 'plane', 20, [0, 0, -20], debug)}
	{@render lightformer('#FFD0CB', 'circle', 5, [0, 5, 0], debug)}
	{@render lightformer('#2223FF', 'plane', 8, [-3, 0, 4], debug)}
</VirtualEnvironment>
