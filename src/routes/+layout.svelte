<script lang="ts">
	import '../app.css'

	import { page } from '$app/state'
	import { Canvas } from '@threlte/core'

	import { useAnalyser } from '$lib'
	import { preload } from '$lib/preload'

	import Keybindings from '$lib/components/Keybindings.svelte'
	import TrackInfo from '$lib/components/TrackInfo.svelte'
	import Settings from '$lib/components/Settings.svelte'
	import PageTransition from '$lib/components/PageTransition.svelte'
	import Scene from '$lib/components/Scene.svelte'
	import Studio from '$lib/components/Studio.svelte'
	import Logo from '$lib/components/Logo.svelte'
	import { goto, onNavigate } from '$app/navigation'
	import Countdown from '$lib/components/Countdown.svelte'
	import PlaylistQr from '$lib/components/PlaylistQR.svelte'
	import { schedulePageCycle } from '$lib/pages.svelte'

	let { children } = $props()

	const { startAnalyser } = useAnalyser()

	$effect(() => {
		preload()
		startAnalyser()
	})

	let id = -1

	$effect(() => {
		clearTimeout(id)
		id = schedulePageCycle()
	})

	onNavigate(() => {
		clearTimeout(id)
		id = schedulePageCycle()
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

{#if page.route.id === '/'}
	<div
		class="absolute left-0 top-0 flex h-screen w-screen flex-col items-center justify-center"
	>
		<Logo class="w-1/2" />
		<div class="flex gap-2">
			<button
				class="flex items-center gap-1 bg-slate-600 px-3 py-1 text-white"
				onclick={() => goto('/lines')}
			>
				<span class="text-xs">get zesty</span> 🤌
			</button>
			<button
				class="flex items-center gap-1 bg-slate-600 px-3 py-1 text-white"
				onclick={() => goto('/about')}
			>
				<span class="text-xs">what the zest?</span> 🧐
			</button>
		</div>
	</div>
{:else}
	<Keybindings />
	<PageTransition />
	<Settings />
	<TrackInfo />
	<Countdown />
	<PlaylistQr />
{/if}
