<script lang="ts">
	import { onNavigate } from '$app/navigation'
	import { Keybindings, useKeybinding } from '$lib/hooks/keybindings.svelte'
	import { transitionPage } from '$lib/hooks/pages.svelte'

	// onNavigate((navigation) => {
	// 	if (!document.startViewTransition) return

	// 	return new Promise((resolve) => {
	// 		document.startViewTransition(async () => {
	// 			resolve()
	// 			await navigation.complete
	// 		})
	// 	})
	// })

	useKeybinding(Keybindings.PreviousPage, () => transitionPage(-1))
	useKeybinding(Keybindings.NextPage, () => transitionPage(+1))
</script>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	:root::view-transition-old(root) {
		animation: 1s cubic-bezier(0.4, 0, 1, 1) both fade-out;
	}

	:root::view-transition-new(root) {
		animation: 1s cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in;
	}
</style>
