<script lang="ts">
	import { fade } from 'svelte/transition'

	import { PersistedState } from 'runed'
	import { useTrack } from '$lib'

	const { track } = useTrack()

	const visible = new PersistedState('trackinfo-visible', true)
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key.toLowerCase() === 't') {
			visible.current = !visible.current
		}
	}}
/>

{#if visible.current && track.current}
	{@const { item } = track.current}
	<div
		class="absolute bottom-0 right-0 flex flex-col items-end gap-1.5 p-4 text-white"
		transition:fade={{ duration: 200 }}
	>
		<div class="h-[120px] w-[120px] overflow-hidden rounded-lg shadow-2xl">
			<img
				class="select-none"
				alt={item.album.name}
				src={item.album.images[0].url}
				width="120"
				height="120"
			/>
		</div>

		<p class="text-sm leading-none">
			{item.name}
		</p>
		<p class="text-xs leading-none">
			{#each item.artists as artist (artist.name)}
				<span>{artist.name}</span>
			{/each}
		</p>
	</div>
{/if}

<style>
	span:not(:last-child)::after {
		content: ', ';
	}
</style>
