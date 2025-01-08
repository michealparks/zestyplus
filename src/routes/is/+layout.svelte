<script>
	import { Canvas } from '@threlte/core'
	import { PersistedState } from 'runed'
	import { onNavigate } from '$app/navigation'
	import { schedulePageCycle } from '$lib/pages.svelte'
	import { useAnalyser } from '$lib'

	import Scene from '$lib/components/Scene.svelte'
	import Studio from '$lib/components/Studio.svelte'
	import PageTransition from '$lib/components/PageTransition.svelte'
	import Settings from '$lib/components/Settings.svelte'
	import TrackInfo from '$lib/components/TrackInfo.svelte'
	import Countdown from '$lib/components/Countdown.svelte'
	import PlaylistQr from '$lib/components/PlaylistQR.svelte'
	import Costco from '$lib/components/Costco.svelte'
	import { Keybindings, useKeybinding } from '$lib/keybindings.svelte'

	let { children } = $props()

	const { startAnalyser } = useAnalyser()

	$effect(() => void startAnalyser())

	let id = -1

	$effect(() => {
		clearTimeout(id)
		id = schedulePageCycle()
	})

	onNavigate(() => {
		clearTimeout(id)
		id = schedulePageCycle()
	})

	let costcoMode = new PersistedState('costco-mode', false)

	useKeybinding(
		Keybindings.CostcoMode,
		() => (costcoMode.current = !costcoMode.current)
	)
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

<PageTransition />
<Settings />
<TrackInfo />
<Countdown />
<PlaylistQr />

{#if costcoMode.current}
	<Costco />
{/if}
