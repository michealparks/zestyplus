<script lang="ts">
	import { fade } from 'svelte/transition'

	import { PersistedState } from 'runed'
	import { useTrack } from '$lib'
	import { Keybindings, useKeybinding } from '$lib/hooks/keybindings.svelte'

	const { track } = useTrack()

	const visible = new PersistedState('trackinfo-visible', true)

	useKeybinding(
		Keybindings.TrackInfo,
		() => (visible.current = !visible.current)
	)
</script>

{#if visible.current && track.current}
	{@const { item } = track.current}
	<div
		class="absolute bottom-0 left-0 flex items-end gap-1.5 p-4 text-white"
		transition:fade={{ duration: 200 }}
	>
		<div class="h-30 w-30 overflow-hidden rounded shadow-2xl">
			<a
				href="https://spotify.com"
				target="_blank"
				class="absolute -mt-8"
			>
				<img
					alt="Spotify logo"
					src="/spotify-logo.svg"
					width="22"
				/>
			</a>
			<a
				href={item.album.external_urls.spotify}
				target="_blank"
			>
				<img
					class="select-none"
					alt={item.album.name}
					src={item.album.images[0].url}
					width="120"
					height="120"
				/>
			</a>
		</div>

		<div class="flex flex-col gap-1 px-2 py-2">
			<a
				href={item.external_urls.spotify}
				target="_blank"
			>
				<p class="text-lg leading-none font-bold">
					{item.name}
				</p>
			</a>
			<p class="text-xs leading-none opacity-75">
				{#each item.artists as artist (artist.name)}
					<a
						href={artist.external_urls.spotify}
						target="_blank"
					>
						{artist.name}
					</a>
				{/each}
			</p>
		</div>
	</div>
{/if}

<style>
	span:not(:last-child)::after {
		content: ', ';
	}
</style>
