<script lang="ts">
	import '../app.css'

	import { goto } from '$app/navigation'
	import { Canvas } from '@threlte/core'
	import { World } from '@threlte/rapier'

	import { useAnalyser } from '$lib'

	import Keybindings from '$lib/components/Keybindings.svelte'
	import TrackInfo from '$lib/components/TrackInfo.svelte'
	import Settings from '$lib/components/Settings.svelte'
	import Postprocessing from '$lib/components/Postprocessing.svelte'

	let { children } = $props()

	const { startAnalyser } = useAnalyser()

	$effect(() => {
		startAnalyser()
	})
</script>

<div class="absolute left-0 top-0 h-screen w-screen">
	<Canvas>
		<Postprocessing />
		<World>
			<svelte:boundary onerror={() => goto('/bar-grid')}>{@render children()}</svelte:boundary>
		</World>
	</Canvas>
</div>

<Keybindings />

<Settings />
<TrackInfo />
