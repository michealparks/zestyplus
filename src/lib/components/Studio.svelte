<script lang="ts">
	import { PersistedState } from 'runed'

	import Scene from './Scene.svelte'
	import { Keybindings, useKeybinding } from '../hooks/keybindings.svelte'

	let { children } = $props()

	let enableStudio = new PersistedState('enable-studio', false)

	useKeybinding(
		Keybindings.Studio,
		() => (enableStudio.current = !enableStudio.current)
	)
</script>

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
