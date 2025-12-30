<script lang="ts">
	import { fade } from 'svelte/transition'
	import { useCountdown } from '$lib/hooks/useCountdown.svelte'
	import { provideWikipedia } from '$lib/hooks/wikipedia.svelte'

	const countdown = useCountdown()
	const wikipedia = provideWikipedia()

	let text = $state()

	$effect(() => {
		let id = 0

		const setEvent = () => {
			text = undefined

			id = window.setTimeout(() => {
				const r = (Math.random() * wikipedia.current.length) | 0
				const item = wikipedia.current[r]

				if (item) {
					text = `${item.date}: ${item.description}`
				}

				id = window.setTimeout(setEvent, 10_000)
			}, 3000)
		}

		setEvent()

		return () => clearTimeout(id)
	})
</script>

{#if text && countdown.displayState === 'idle'}
	<p
		transition:fade
		class="absolute top-0 left-0 z-10 w-3/4 p-4 text-xs text-white"
	>
		{text}
	</p>
{/if}
