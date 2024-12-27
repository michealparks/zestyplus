<script lang="ts">
	import '../app.css'

	import { Canvas } from '@threlte/core'

	import { useAnalyser } from '$lib'
	import { preload } from '$lib/preload'

	import Keybindings from '$lib/components/Keybindings.svelte'
	import TrackInfo from '$lib/components/TrackInfo.svelte'
	import Settings from '$lib/components/Settings.svelte'
	import PageTransition from '$lib/components/PageTransition.svelte'
	import Scene from '$lib/components/Scene.svelte'
	import Studio from '$lib/components/Studio.svelte'

	let { children } = $props()

	const { startAnalyser } = useAnalyser()

	$effect(() => {
		preload()
		startAnalyser()
	})
</script>

<div class="absolute left-0 top-0 h-screen w-screen">
	<Canvas>
		{#if import.meta.env.MODE === 'development'}
			<Studio>
				{@render children()}
			</Studio>
		{:else}
			<Scene>
				{@render children()}
			</Scene>
		{/if}
	</Canvas>
</div>

<Keybindings />

<Settings />
<TrackInfo />

<PageTransition />
