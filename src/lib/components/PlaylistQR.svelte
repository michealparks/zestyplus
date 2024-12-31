<script lang="ts">
	import { useTrack } from '$lib/track.svelte'
	import QrCreator from 'qr-creator'

	const { track } = useTrack()

	let div: HTMLElement | undefined

	const render = (el: HTMLElement, text?: string) => {
		el.innerHTML = ''

		if (text === undefined) return

		QrCreator.render(
			{
				text,
				radius: 0.0, // 0.0 to 0.5
				ecLevel: 'H', // L, M, Q, H
				fill: '#fff', // foreground color
				background: null, // color or null for transparent
				size: 128, // in pixels
			},
			el
		)
	}

	$effect(() => {
		if (div === undefined) return

		const url = track.current?.context?.external_urls?.spotify

		render(div, url)
	})
</script>

<div
	class="z-1 inline-flex w-24 p-4"
	bind:this={div}
></div>

<style>
	div :global(canvas) {
		width: 100%;
		opacity: 0.6;
	}
</style>
