<script lang="ts">
	import * as THREE from 'three/webgpu'
	import { WebGPURenderer } from 'three/webgpu'
	import { Canvas, extend } from '@threlte/core'
	import { World } from '@threlte/rapier'

	import { useSchedulePageCycle } from '$lib/hooks/pages.svelte'
	import { provideTrack } from '$lib/hooks/track.svelte'
	import { provideAnalyser } from '$lib/analyser.svelte'
	import { provideSpotify } from '$lib/api/spotify/auth.svelte'

	import Scene from '$lib/components/Scene.svelte'
	import PageTransition from '$lib/components/PageTransition.svelte'
	import Settings from '$lib/components/Settings.svelte'
	import TrackInfo from '$lib/components/TrackInfo.svelte'
	import Countdown from '$lib/components/Countdown.svelte'
	import PlaylistQR from '$lib/components/PlaylistQR.svelte'
	import Costco from '$lib/components/Costco.svelte'
	import PageSelector from '$lib/components/PageSelector.svelte'
	import Wikipedia from '$lib/components/Wikipedia.svelte'
	import AudioAnalyserDebug from '$lib/components/AudioAnalyserDebug.svelte'
	import { useSettings } from '$lib/hooks/useSettings.svelte'

	let { children } = $props()

	const { showDebug, showQR, showCostco, showWikipedia } = useSettings()

	extend(THREE)

	provideSpotify()
	provideTrack()
	provideAnalyser()
	useSchedulePageCycle()

	let initialized = $state(false)
</script>

<div class="absolute top-0 left-0 h-dvh w-dvw">
	<Canvas
		renderMode={initialized ? 'always' : 'manual'}
		dpr={1}
		createRenderer={(canvas) => {
			const renderer = new WebGPURenderer({
				canvas,
				antialias: true,
			})

			renderer.init().then(() => {
				initialized = true
			})

			return renderer
		}}
	>
		{#if initialized}
			<World gravity={[0, -1, 0]}>
				<Scene>
					{@render children()}
				</Scene>
			</World>
		{/if}
	</Canvas>
</div>

{#if showDebug.current}
	<AudioAnalyserDebug />
{/if}

<PageTransition />
<PageSelector />
<Settings />
<TrackInfo />
<Countdown />

{#if showQR.current}
	<PlaylistQR />
{/if}

{#if showWikipedia.current}
	<Wikipedia />
{/if}

{#if showCostco.current}
	<Costco />
{/if}
