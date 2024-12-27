<script lang="ts">
	import { PersistedState } from 'runed'

	import Scene from './Scene.svelte'
	import { KeyBindings } from '../keybindings'

	let { children } = $props()

	let enableStudio = new PersistedState('enable-studio', false)
</script>

<svelte:window
	onkeydown={(event) => {
		const key = event.key.toLowerCase()

		if (key === KeyBindings.Studio) {
			enableStudio.current = !enableStudio.current
		}
	}}
/>

{#if enableStudio.current}
	{#await import('@threlte/studio') then { Studio }}
		<Studio>
			<Scene>
				{@render children()}
			</Scene>
		</Studio>
	{/await}
{:else}
	<Scene>
		{@render children()}
	</Scene>
{/if}
