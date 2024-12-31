<script lang="ts">
	import Postprocessing from '$lib/components/Postprocessing.svelte'
	import { PersistedState } from 'runed'
	import { KeyBindings } from '$lib/keybindings'

	let { children } = $props()

	const debug = new PersistedState('show-debug-tools', false)
</script>

<svelte:window
	onkeydown={({ key }) => {
		if (key === KeyBindings.Debug) {
			debug.current = !debug.current
		}
	}}
/>

<Postprocessing />

{@render children()}
