<script lang="ts">
	import '../app.css'

	import { Keybindings, useKeybinding } from '$lib/hooks/keybindings.svelte'
	import { useDocumentTitle } from '$lib/hooks/title.svelte'

	let { children } = $props()

	useKeybinding(Keybindings.Fullscreen, () => document.body.requestFullscreen())

	useDocumentTitle()
</script>

{@render children()}
