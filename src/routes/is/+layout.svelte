<script lang="ts">
	import * as THREE from 'three/webgpu'
	import { WebGPURenderer } from 'three/webgpu'
	import { Canvas, extend } from '@threlte/core'
	import { PersistedState } from 'runed'
	import { useSchedulePageCycle } from '$lib/hooks/pages.svelte'
	import { World } from '@threlte/rapier'
	import Scene from '$lib/components/Scene.svelte'
	import PageTransition from '$lib/components/PageTransition.svelte'
	import Settings from '$lib/components/Settings.svelte'
	import TrackInfo from '$lib/components/TrackInfo.svelte'
	import Countdown from '$lib/components/Countdown.svelte'
	import PlaylistQr from '$lib/components/PlaylistQR.svelte'
	import Costco from '$lib/components/Costco.svelte'
	import { Keybindings, useKeybinding } from '$lib/hooks/keybindings.svelte'
	import PageSelector from '$lib/components/PageSelector.svelte'
	import { provideAnalyser } from '$lib/analyser.svelte'
	import { provideWikipedia } from '$lib/hooks/wikipedia.svelte'

	let { children } = $props()

	extend(THREE)

	provideAnalyser()
	const wikipedia = provideWikipedia()

	let costcoMode = new PersistedState('costco-mode', false)

	useKeybinding(
		Keybindings.CostcoMode,
		() => (costcoMode.current = !costcoMode.current)
	)

	useSchedulePageCycle()

	let renderMode = $state<'manual' | 'always'>('manual')

	let text = $state()

	const setEvent = () => {
		const r = (Math.random() * wikipedia.current.length) | 0
		const item = wikipedia.current[r]

		if (item) {
			text = `${item.date}: ${item.description}`
		}
	}

	$effect(() => {
		setEvent()
		const id = setInterval(() => {
			setEvent()
		}, 10_000)

		return () => clearInterval(id)
	})
</script>

<div class="absolute top-0 left-0 h-dvh w-dvw">
	<p
		class="absolute right-0 bottom-0 z-10 w-3/4 p-4 text-right text-xs text-white"
	>
		{text}
	</p>

	<Canvas
		{renderMode}
		createRenderer={(canvas) => {
			const renderer = new WebGPURenderer({
				canvas,
				antialias: true,
				forceWebGL: false,
			})

			renderer.init().then(() => {
				renderMode = 'always'
			})

			return renderer
		}}
	>
		{#if renderMode === 'always'}
			<World gravity={[0, -1, 0]}>
				<Scene>
					{@render children()}
				</Scene>
			</World>
		{/if}
	</Canvas>
</div>

<PageTransition />
<PageSelector />
<Settings />
<TrackInfo />
<Countdown />
<PlaylistQr />

{#if costcoMode.current}
	<Costco />
{/if}
