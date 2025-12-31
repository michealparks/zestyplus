<script lang="ts">
	import QrCreator from 'qr-creator'
	import { useTrack } from '$lib/hooks/track.svelte'

	const track = useTrack()

	let div = $state.raw<HTMLElement>()
	let url = $derived(track.current?.context?.external_urls?.spotify)

	$effect(() => {
		if (div === undefined) return
		if (url === undefined) return

		QrCreator.render(
			{
				text: url,
				radius: 0.1, // 0.0 to 0.5
				ecLevel: 'H', // L, M, Q, H
				fill: '#fff', // foreground color
				background: null, // color or null for transparent
				size: 128, // in pixels
			},
			div
		)
	})
</script>

{#if url}
	<div class="absolute right-0 bottom-0 z-1 items-center p-4">
		<div
			class="inline-flex w-22"
			bind:this={div}
		></div>
	</div>
{/if}

<style>
	div :global(canvas) {
		width: 100%;
		opacity: 0.6;
	}
</style>
