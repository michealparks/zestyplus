<script lang="ts">
	import { fade } from 'svelte/transition'
	import { IsIdle } from 'runed'
	import { transitionPage } from '$lib/hooks/pages.svelte'

	const idle = new IsIdle({ timeout: 3000 })
</script>

{#if !idle.current}
	<div
		class="absolute top-2 right-8"
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
