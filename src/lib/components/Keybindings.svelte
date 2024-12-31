<script lang="ts">
	import { transitionPage } from '$lib/pages.svelte'
	import { KeyBindings } from '$lib/keybindings'

	const toggleFullscreen = async () => {
		document.body.requestFullscreen()
	}

	const onkeydown = ({ key }: KeyboardEvent) => {
		console.log(key)
		switch (key.toLowerCase()) {
			case KeyBindings.Fullscreen:
				return toggleFullscreen()
			case KeyBindings.PreviousPage:
				return transitionPage(-1)
			case KeyBindings.NextPage:
				return transitionPage(+1)
		}
	}
</script>

<svelte:window {onkeydown} />
<svelte:body onmousedown={(event) => event.target.requestPointerLock()} />
