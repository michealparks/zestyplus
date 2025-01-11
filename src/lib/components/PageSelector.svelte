<script lang="ts">
	import { fade } from 'svelte/transition'
	import { IsIdle } from 'runed'
	import { transitionPage } from '$lib/hooks/pages.svelte'

	const idle = new IsIdle({ timeout: 3000 })
</script>

{#if !idle.current}
	<div
		class="absolute bottom-2 right-2"
		transition:fade
	>
		<button
			type="button"
			class="variant-filled btn-icon btn-icon-sm"
			onclick={() => transitionPage(-1)}>←</button
		>
		<button
			type="button"
			class="variant-filled btn-icon btn-icon-sm"
			onclick={() => transitionPage(+1)}>→</button
		>
	</div>
{/if}
