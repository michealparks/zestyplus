<script lang="ts">
	import { Debug, World } from '@threlte/rapier'
	import Postprocessing from '$lib/components/Postprocessing.svelte'

	let { children } = $props()
</script>

<Postprocessing />

<World>
	<!-- <Debug /> -->
	{@render children()}
</World>
