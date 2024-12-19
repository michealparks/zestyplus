<script lang="ts">
	import '../app.css'

	import { Canvas } from '@threlte/core'
	import { World } from '@threlte/rapier'

	import { useAnalyser } from '$lib'

	import Keybindings from '$lib/components/Keybindings.svelte'
	import MusicServices from '$lib/components/MusicServices.svelte'

	let { children } = $props()

	const { startAnalyser } = useAnalyser()

	$effect(() => {
		startAnalyser()
	})
</script>

<div class="absolute left-0 top-0 h-screen w-screen">
	<Canvas>
		<World>
			{@render children()}
		</World>
	</Canvas>
</div>

<Keybindings />
<MusicServices />
