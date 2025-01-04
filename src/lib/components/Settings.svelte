<script lang="ts">
	import { fade } from 'svelte/transition'
	import { PersistedState, IsIdle } from 'runed'

	import Spotify from './Spotify.svelte'
	import Logo from './Logo.svelte'
	import { Keybindings, useKeybinding } from '$lib/keybindings.svelte'

	const open = new PersistedState('settings-open', false)
	const idle = new IsIdle({ timeout: 3000 })

	useKeybinding(Keybindings.Settings, () => (open.current = !open.current))
</script>

{#if !idle.current}
	<button
		class="absolute right-2 top-2 z-10 h-6 w-6 p-1"
		aria-label="Open settings"
		onclick={() => (open.current = !open.current)}
		transition:fade
	>
		<svg
			class="h-full fill-white"
			viewBox="0 0 32 32"
		>
			<path
				d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z"
			/>
			<path
				d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z"
			/>
			<path
				d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z"
			/>
		</svg>
	</button>
{/if}

{#if open.current}
	<button
		aria-label="Exit settings"
		class="absolute left-0 top-0 z-20 grid h-screen w-screen cursor-default backdrop-blur-sm"
		onclick={(event) => {
			if (event.target === event.currentTarget) {
				open.current = false
			}
		}}
	></button>
	<div
		class="pointer-events-none absolute left-0 top-0 z-20 grid h-screen w-screen place-content-center"
	>
		<div
			class="pointer-events-auto h-44 w-80 rounded-sm bg-white p-2 shadow-xl"
		>
			<div class="-mt-12 mb-4 flex w-full justify-center">
				<Logo class="w-24" />
			</div>

			<div class="flex justify-center">
				<Spotify />
			</div>
		</div>
	</div>
{/if}
