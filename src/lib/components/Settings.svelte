<script lang="ts">
	import { fade } from 'svelte/transition'
	import { IsIdle } from 'runed'

	import Spotify from './Spotify.svelte'
	import { Keybindings, useKeybinding } from '$lib/hooks/keybindings.svelte'

	let open = $state(false)

	const idle = new IsIdle({ timeout: 3000 })

	useKeybinding(Keybindings.Settings, () => (open = !open))
</script>

{#if !idle.current}
	<button
		class="absolute top-2 right-2 z-10 h-6 w-6 p-1"
		aria-label="Open settings"
		onclick={() => (open = !open)}
		transition:fade
	>
		<svg
			class="h-full fill-white"
			viewBox="0 0 32 32"
		>
			<path
				d="M13,16c0,1.65,1.34,3,3,3s3-1.34,3-3s-1.34-3-3-3S13,14.34,13,16z"
			/>
			<path
				d="M13,26c0,1.65,1.34,3,3,3s3-1.34,3-3s-1.34-3-3-3S13,24.34,13,26z"
			/>
			<path d="M13,6c0,1.654,1.34,3,3,3s3-1.34,3-3s-1.34-3-3-3S13,4.34,13,6z" />
		</svg>
	</button>
{/if}

{#if open}
	<button
		aria-label="Exit settings"
		class="absolute top-0 left-0 z-20 grid h-screen w-screen cursor-default bg-amber-400 opacity-10"
		onclick={(event) => {
			if (event.target === event.currentTarget) {
				open = false
			}
		}}
	></button>
	<div
		class="text-secondary-800 pointer-events-none absolute top-0 left-0 z-20 grid h-screen w-screen place-content-center"
	>
		<div
			class="card pointer-events-auto w-80 rounded-sm bg-white p-4 shadow-xl"
		>
			<div class="-mt-12 mb-4 flex w-full justify-center">
				<img
					alt=""
					width="200"
					src="/zestyplus2.png"
				/>
			</div>

			<div class="flex flex-col items-center justify-center gap-4">
				<div class="flex flex-col gap-2">
					<small>Not sure what to play?</small>

					<a
						class="btn btn-sm text-xs"
						href="https://open.spotify.com/playlist/3TfXpq49b3Q93pCz4SfB7K?si=bf8730839a6844af&nd=1&dlsi=234712d881d24f8f"
						target="_blank"
					>
						2025 Playlist
					</a>
				</div>

				<hr />

				<div class="flex flex-col justify-between gap-1.5 text-xs">
					<h4 class="text-sm"><strong>Keybindings</strong></h4>
					{#each [['←', 'Previous page'], ['→', 'Next page'], ['F', 'Fullscreen'], ['C', 'Costco mode']] as [key, label] (label)}
						<div class="flex w-full items-center gap-2">
							<kbd class="kbd h-6 w-6 font-mono text-black">{key}</kbd>
							<div>
								{label}
							</div>
						</div>
					{/each}
				</div>

				<hr class="border" />

				<Spotify />
			</div>
		</div>
	</div>
{/if}
