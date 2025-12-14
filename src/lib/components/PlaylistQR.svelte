<script lang="ts">
	import QrCreator from 'qr-creator'
	import { PersistedState } from 'runed'
	import { useTrack } from '$lib/hooks/track.svelte'
	import { Keybindings, useKeybinding } from '$lib/hooks/keybindings.svelte'

	const showQR = new PersistedState('show-playlist-qr-code', false)

	const { track } = useTrack()

	let div = $state<HTMLElement>()
	let url = $derived(track.current?.context?.external_urls?.spotify)

	$effect(() => {
		if (div === undefined) return
		if (url === undefined) return

		QrCreator.render(
			{
				text: url,
				radius: 0.0, // 0.0 to 0.5
				ecLevel: 'H', // L, M, Q, H
				fill: '#fff', // foreground color
				background: null, // color or null for transparent
				size: 128, // in pixels
			},
			div
		)
	})

	useKeybinding(Keybindings.QRCode, () => (showQR.current = !showQR.current))
</script>

{#if showQR.current && url}
	<div
		class="z-1 inline-flex w-24 p-4"
		bind:this={div}
	></div>
{/if}

<style>
	div :global(canvas) {
		width: 100%;
		opacity: 0.6;
	}
</style>
