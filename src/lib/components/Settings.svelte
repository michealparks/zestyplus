<script lang="ts">
	import { PersistedState } from 'runed'

	import MusicServices from './MusicServices.svelte'

	const open = new PersistedState('settings-open', false)
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key.toLowerCase() === 's') {
			open.current = !open.current
		}
	}}
/>

<button
	class="absolute right-2 top-2 z-10 h-6 w-6 p-1"
	aria-label="Open settings"
	onclick={() => (open.current = !open.current)}
>
	<svg
		class="h-full"
		viewBox="0 0 32 32"
	>
		<path d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" />
		<path d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" />
		<path d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" />
	</svg>
</button>

{#if open.current}
	<div class="absolute left-0 top-0 grid h-screen w-screen backdrop-blur-sm"></div>
	<div class="absolute left-0 top-0 grid h-screen w-screen place-content-center">
		<div class="h-44 w-80 rounded-sm bg-white p-2 shadow-xl">
			<MusicServices />
		</div>
	</div>
{/if}
