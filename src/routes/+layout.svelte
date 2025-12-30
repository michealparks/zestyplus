<script lang="ts">
	import '../app.css'

	import {
		Keybindings,
		provideKeybinding,
		useKeybinding,
	} from '$lib/hooks/keybindings.svelte'
	import { provideDocumentTitle } from '$lib/hooks/title.svelte'
	import { provideCountdown } from '$lib/hooks/useCountdown.svelte'
	import { provideSettings } from '$lib/hooks/useSettings.svelte'

	let { children } = $props()

	provideKeybinding()
	provideSettings()
	provideCountdown()
	provideDocumentTitle()

	useKeybinding(Keybindings.Fullscreen, () => {
		document.body.requestFullscreen()
	})
</script>

{@render children()}
