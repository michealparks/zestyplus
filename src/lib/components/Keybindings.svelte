<script lang="ts">
	import { pages } from '$lib/pages'
	import { page } from '$app/state'
	import { goto } from '$app/navigation'
	import { KeyBindings } from '$lib/keybindings'

	const toggleFullscreen = async () => {
		document.body.requestFullscreen()
	}

	const transitionPage = (direction: 1 | -1) => {
		const currentPage = page.url.pathname.replace('/', '')
		const currentIndex = pages.findIndex((page) => page === currentPage)
		let nextIndex = currentIndex + direction
		if (nextIndex === pages.length) {
			nextIndex = 0
		} else if (nextIndex === -1) {
			nextIndex = pages.length - 1
		}
		goto(`/${pages[nextIndex]}`)
	}

	const onkeydown = (event: KeyboardEvent) => {
		const key = event.key.toLowerCase()
		switch (key) {
			case KeyBindings.Fullscreen:
				return toggleFullscreen()
			case KeyBindings.PreviousPage:
				return transitionPage(-1)
			case KeyBindings.NextPage:
				return transitionPage(1)
		}
	}
</script>

<svelte:window {onkeydown} />
