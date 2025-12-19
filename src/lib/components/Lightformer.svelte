<script lang="ts">
	import { DoubleSide, type ColorRepresentation } from 'three'
	import { T, observe } from '@threlte/core'
	import { VirtualEnvironment, TransformControls } from '@threlte/extras'

	interface Props {
		color1?: ColorRepresentation
		color2?: ColorRepresentation
		color3?: ColorRepresentation
		debug?: boolean
	}

	let {
		color1 = '#FF4F4F',
		color2 = '#FFD0CB',
		color3 = '#2223FF',
		debug = false,
	}: Props = $props()

	let virtualEnvironment = $state.raw<VirtualEnvironment>()

	observe(
		() => [color1, color2, color3],
		() => virtualEnvironment?.update()
	)
</script>

{#snippet lightformer(
	color: ColorRepresentation,
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
			<T.Mesh oncreate={(ref) => ref.lookAt(0, 0, 0)}>
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

<VirtualEnvironment
	bind:this={virtualEnvironment}
	visible={debug}
>
	{@render lightformer(color1, 'plane', 4, [2, -10, -20], debug)}
	{@render lightformer(color2, 'circle', 8, [3, -5, 0], debug)}
	{@render lightformer(color3, 'plane', 10, [-3, -2, 4], debug)}
</VirtualEnvironment>
