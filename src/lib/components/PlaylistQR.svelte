<script lang="ts">
	import QrCreator from 'qr-creator'
	import { PersistedState } from 'runed'
	import { useTrack } from '$lib/track.svelte'
	import { KeyBindings } from '$lib/keybindings'

	const showQR = new PersistedState('show-playlist-qr-code', false)

	const { track } = useTrack()

	let div: HTMLElement | undefined = $state()

	let url = $derived(track.current?.context?.external_urls?.spotify)

	$effect(() => {
		if (div && url) {
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
		}
	})
</script>

<svelte:window
	onkeydown={({ key }) => {
		if (key.toLowerCase() === KeyBindings.QRCode) {
			showQR.current = !showQR.current
		}
	}}
/>

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
