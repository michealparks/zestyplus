<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { useAnalyser } from '$lib'

	import Ribbon from './Ribbon.svelte'

	const { frequencyData } = useAnalyser()

	interface Trigger {
		on: boolean
		dashOffset: number
	}

	const count = 10

	const triggers: Trigger[] = $state(
		Array.from({ length: count }).map(() => ({
			on: false,
			dashOffset: 0,
		}))
	)

	const ribbons = Array.from({ length: count }).map((_, i) => ({
		x: (i - 3) * 0.4,
		baseWidth: (i + 1) * 0.001 - 0.005 * i,
		dashRatio: 0.7 + i * 0.1,
	}))

	useTask((delta) => {
		for (let i = 0, j = 10; i < triggers.length; i += 1, j += 15) {
			if (triggers[i].on === false && frequencyData.current[j] > 120) {
				triggers[i].on = true
				triggers[i].dashOffset = -0.1
			}

			if (triggers[i].on && triggers[i].dashOffset > 1.2) {
				triggers[i].on = false
			}

			triggers[i].dashOffset += delta / 2
		}
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

{#each ribbons as ribbon, index}
	<Ribbon
		position.x={ribbon.x}
		baseWidth={ribbon.baseWidth}
		opacity={triggers[index].on ? 1 : 0}
		dashOffset={triggers[index].dashOffset}
		dashRatio={ribbon.dashRatio}
	/>
{/each}

<Ribbon
	position.x={-1}
	baseWidth={0.01}
	baseDashOffset={0.2}
/>

<Ribbon
	position.x={-1.5}
	baseWidth={0.005}
	baseDashOffset={0.3}
/>

<Ribbon
	position.x={1.5}
	baseWidth={0.005}
	baseDashOffset={0.4}
/>
