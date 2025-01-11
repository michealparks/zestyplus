<script lang="ts">
	import '../app.css'

	import { preload } from '$lib/preload'
	import { Keybindings, useKeybinding } from '$lib/hooks/keybindings.svelte'
	import { useDocumentTitle } from '$lib/hooks/title.svelte'

	let { children } = $props()

	$effect(() => preload())

	useKeybinding(Keybindings.Fullscreen, () => document.body.requestFullscreen())

	useDocumentTitle()
</script>

{@render children()}
