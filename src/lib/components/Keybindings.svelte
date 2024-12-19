<script lang="ts">
	const toggleFullscreen = async () => {
		document.body.requestFullscreen()
		document.body.requestPointerLock()
	}

	const onkeydown = (event: KeyboardEvent) => {
		switch (event.key.toLowerCase()) {
			case 'f':
				return toggleFullscreen()
		}
	}
</script>

<svelte:window {onkeydown} />
