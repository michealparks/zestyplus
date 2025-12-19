<script lang="ts">
	import Postprocessing from '$lib/components/Postprocessing.svelte'

	let { children } = $props()
</script>

<!-- <Postprocessing /> -->

{@render children()}
