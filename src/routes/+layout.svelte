<script lang="ts">
	import '../app.css'

	import { preload } from '$lib/preload'
	import { Keybindings, useKeybinding } from '$lib/keybindings.svelte'

	let { children } = $props()

	$effect(() => preload())

	useKeybinding(Keybindings.Fullscreen, () => document.body.requestFullscreen())
</script>

{@render children()}
