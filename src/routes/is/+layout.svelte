<script>
	import { Canvas } from '@threlte/core'
	import { PersistedState } from 'runed'
	import { onNavigate } from '$app/navigation'
	import { schedulePageCycle } from '$lib/hooks/pages.svelte'
	import { useAnalyser } from '$lib'
	import { AutoColliders, RigidBody, World } from '@threlte/rapier'

	import Scene from '$lib/components/Scene.svelte'
	import Studio from '$lib/components/Studio.svelte'
	import PageTransition from '$lib/components/PageTransition.svelte'
	import Settings from '$lib/components/Settings.svelte'
	import TrackInfo from '$lib/components/TrackInfo.svelte'
	import Countdown from '$lib/components/Countdown.svelte'
	import PlaylistQr from '$lib/components/PlaylistQR.svelte'
	import Costco from '$lib/components/Costco.svelte'
	import { Keybindings, useKeybinding } from '$lib/hooks/keybindings.svelte'
	import PageSelector from '$lib/components/PageSelector.svelte'

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

<div class="relative h-screen w-screen">
	<Canvas>
		<World gravity={[0, -1, 0]}>
			{#if import.meta.env.MODE === 'development'}
				<Studio>
					{@render children()}
				</Studio>
			{:else}
				<Scene>
					{@render children()}
				</Scene>
			{/if}
		</World>
	</Canvas>
</div>

<PageTransition />
<PageSelector />
<Settings />
<TrackInfo />
<!-- <Countdown /> -->
<PlaylistQr />

{#if costcoMode.current}
	<Costco />
{/if}
